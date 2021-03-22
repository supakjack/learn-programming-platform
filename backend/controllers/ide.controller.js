const createError = require("http-errors");
const { comileLogic } = require("./../helpers/compile.helper");
const { create } = require("./../helpers/createLog.helper");
const globalModel = require("../models/global.model");
const problemModel = require("../models/problems.model");
const nanoid = require("nanoid");
const mkdirp = require("mkdirp");
const rmdir = require("rmdir");
const path = require("path");
const fs = require("fs-extra");

const { writeFileLogic } = require("./../helpers/writeFile.helper");
const { createFiles } = require("./../helpers/validation.helper");
const { creteCompileLogSchema } = require("./../helpers/validation.helper");

module.exports = {
  // function name: run
  // description: run compile by API
  // input: language, source, path, stdin
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  run: async (req, res, next) => {
    const compile = req.query.compile,
      language = req.query.language,
      source = req.body.source,
      path = req.body.path,
      stdin = req.body.stdin;
    try {
      const doesCompile = await comileLogic(
        language,
        compile,
        stdin,
        source,
        path
      );

      res.status(200).send(doesCompile);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  // function name: run
  // description: run compile by API
  // input: language, source, path, stdin
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  seperate: async (req, res, next) => {
    const language = req.body.language,
      source = req.body.source,
      stdin = req.body.stdin,
      singleFiles = req.files ? req.files.singleFile : null;

    try {
      let languageResult;
      if (language == "C++") {
        languageResult = "cpp";
      } else if (language == "C") {
        languageResult = "c";
      }
      // run with source code
      if (source) {
        const doesCompile = await comileLogic(
          languageResult,
          "source",
          stdin,
          source.toString(),
          null
        );
        res.status(200).send(doesCompile);
        // run with file path
      } else {
        let folderNano = await nanoid(6);
        const filePath =
          process.env.BASE_STORAGE_PATH + "justRun" + "\\" + folderNano;
        await mkdirp(filePath);
        if (singleFiles.length) {
          await singleFiles.map(async (single) => {
            await single.mv(filePath + "\\" + single.name);
          });
          await singleFiles.map(async (single) => {
            if (single.name == "main.cpp") {
              const path = filePath + "\\" + single.name;
              const doesCompile = await comileLogic(
                languageResult,
                "path",
                stdin,
                source,
                path
              );
              let result = await rmdir(
                filePath,
                function (err, dirs, files) {}
              );
              res.status(200).send(doesCompile);
            }
          });
        } else {
          await singleFiles.mv(filePath + "\\" + singleFiles.name);
          const path = filePath + "\\" + singleFiles.name;
          const doesCompile = await comileLogic(
            languageResult,
            "path",
            stdin,
            source,
            path
          );
          let result = await rmdir(filePath, function (err, dirs, files) {});
          // let result = fs.unlinkSync(filePath + "\\" + singleFiles.name + ".cpp");
          // expected output: "Success!"
          res.status(200).send(doesCompile);
        }
      }
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  // function name: testset
  // description: compile with test set of problem question by API
  // input: testsetId, filePath
  // output: fail, pass, error
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 15/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 18/2/2021
  testset: async (req, res, next) => {
    const filePath = req.body.filePath,
      testsetId = req.query.testsetId,
      // taskId = req.query.taskId,
      // SubmitNo = req.query.SubmitNo,
      language = req.body.language;
    // fileId = req.query.fileId,
    // compilelogCreateBy = req.query.CreateBy,
    // compilelogUpdateBy = req.query.UpdateBy;

    const createCompileLogData = {
      testsetId: testsetId,
      //   compilelogSubmitNo: SubmitNo,
      //   compilelogTestResult,
      // compilelogErrorMessage,
      // compilelogCompileStatus,
      // compileloglanguage: language,
      //   compilelogFileId: fileId,
      //   compilelogCreateBy: compilelogCreateBy,
      //   compilelogUpdateBy: compilelogUpdateBy,
    };

    try {
      const doesGetTestset = await globalModel.select({
        name: "testsets",
        condition: [{ testsetId: testsetId }],
      });

      const doesCompile = await comileLogic(
        language,
        "path",
        doesGetTestset[0].testsetInput,
        null,
        filePath
      );

      if (
        doesCompile.stdout == doesGetTestset[0].testsetOutput &&
        doesCompile.stderr == ""
      ) {
        createCompileLogData.compilelogCompileStatus = "Passed";
        createCompileLogData.compilelogErrorMessage = doesCompile.stderr;
      } else if (
        doesCompile.stdout != doesGetTestset[0].testsetOutput &&
        doesCompile.stderr == ""
      ) {
        createCompileLogData.compilelogCompileStatus = "Failed";
        createCompileLogData.compilelogErrorMessage = doesCompile.stderr;
      
      } else {
        createCompileLogData.compilelogCompileStatus = "Error";
        createCompileLogData.compilelogErrorMessage = doesCompile.stderr;
       
      }
      res.status(200).send(createCompileLogData);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: submit
  // description: submit files by API
  // input: yearName,courseCode,sectionNumber,assignmentTitle,problemTitle,userUsername,taskId,memeFile,singleFile
  // output: text response
  // CreateBy: Theo Seathan / CreateDate: 1/2/2021
  // UpdateBy: Theo Seathan / UpdateDate: 1/2/2021
  submit: async (req, res, next) => {
    //Create dir path
    const yearName = req.body.yearName,
      courseCode = req.body.courseCode,
      sectionNumber = req.body.sectionNumber,
      assignmentTitle = req.body.assignmentTitle,
      problemTitle = req.body.problemTitle,
      userUsername = req.body.userUsername,
      memeFile = req.body.memeFile,
      singleFile = req.files ? req.files.singleFile : null,
      //insert files table
      fileCreateBy = req.body.fileCreateBy,
      fileUpdateBy = req.body.fileUpdateBy,
      //source code
      sourceCode = req.body.sourceCode;

    try {
      let languageResult;
      if (memeFile == "C++") {
        languageResult = "cpp";
      } else if (memeFile == "C") {
        languageResult = "c";
      }
      const doesSelect = await globalModel.select({
        name: "files",
        like: [
          {
            name: "filePath",
            condition:
              "%" +
              yearName +
              "_" +
              courseCode +
              "_sec-" +
              sectionNumber +
              "_" +
              assignmentTitle +
              "_" +
              problemTitle +
              "_" +
              userUsername +
              "%",
          },
        ],
      });

      // console.log(doesSelect);
      let no = 1;
      if (doesSelect.length > 0) {
        number = doesSelect.map((rowFile) => {
          const index = rowFile.filePath.search("no-");
          const file = rowFile.filePath
            .substr(index + 3, rowFile.length)
            .split("\\");
          return Number(file[0]);
        });
        const lastNumber = Math.max(...number);

        no = lastNumber + 1;
      }

      const filePath =
        process.env.BASE_STORAGE_PATH +
        yearName +
        "\\" +
        courseCode +
        "\\sec-" +
        sectionNumber +
        "\\" +
        assignmentTitle +
        "\\" +
        problemTitle +
        "\\" +
        userUsername +
        "\\no-" +
        no;
      await mkdirp(filePath);
      let dataReturn;
      //Source Code
      if (sourceCode) {
        await fs.writeFile(
          filePath + "\\" + "main." + languageResult,
          sourceCode
        );
        const fileName = await writeFileLogic(sourceCode, null, languageResult);

        // schema files table
        const createFilesData = await createFiles.validateAsync({
          filePath: filePath + "\\" + "main.cpp",
          fileCreateBy,
          fileUpdateBy,
        });

        // insert to files table
        const fileId = await problemModel.insertReturnId({
          name: "files",
          insertData: [createFilesData],
        });

        dataReturn = {
          path: filePath + "\\" + fileName,
          number: no,
          language: languageResult,
          fileId: fileId,
        };
      } else {
        if (singleFile.length) {
          await singleFile.map(async (single) => {
            await single.mv(filePath + "\\" + single.name);
            const fileName = await writeFileLogic(sourceCode, single, memeFile);

            // schema files table
            const createFilesData = await createFiles.validateAsync({
              filePath: filePath + "\\" + fileName,
              fileCreateBy,
              fileUpdateBy,
            });

            // insert to files table
            const fileId = await problemModel.insertReturnId({
              name: "files",
              insertData: [createFilesData],
            });
          });

          dataReturn = {
            path: filePath + "\\" + "main.cpp",
            number: no,
            language: languageResult,
            fileId: fileId,
          };
        } else {
          await singleFile.mv(filePath + "\\" + singleFile.name);

          const fileName = await writeFileLogic(
            sourceCode,
            singleFile,
            memeFile
          );
          // schema files table
          const createFilesData = await createFiles.validateAsync({
            filePath: filePath + "\\" + fileName,
            fileCreateBy,
            fileUpdateBy,
          });

          // insert to files table
          const fileId = await problemModel.insertReturnId({
            name: "files",
            insertData: [createFilesData],
          });
          dataReturn = {
            path: filePath + "\\" + fileName,
            number: no,
            language: languageResult,
            fileId: fileId,
          };
        }
      }

      res.status(200).send({ dataReturn });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: create
  // description: create compile log
  // input:
  // output: text response
  // CreateBy: Theo Seathan / CreateDate: 6/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
  create: async (req, res, next) => {
    // select taskScore by taskId from req.body
    var doesGetTaskAll = await globalModel.select({
      name: "tasks",
      condition: [{ taskId: req.body.compilelogTaskId }],
    });

    // Parse to Array
    doesGetTaskAll = doesGetTaskAll[0];

    // create const createCompileLogData from req.body
    const createCompileLogData = {
      compilelogTaskId: req.body.compilelogTaskId,
      compilelogSubmitNo: req.body.compilelogSubmitNo,
      compileloglanguage: req.body.compileloglanguage,
      compilelogFileId: req.body.compilelogFileId,
      compilelogCreateBy: req.body.compilelogCreateBy,
      compilelogUpdateBy: req.body.compilelogCreateBy,
    };

    // declare variable for calculate data
    const testsetResult = req.body.testsetResult;
    var compilelogErrorMessage = "";
    var sumScore = 0;
    var maxTestset = testsetResult.length;
    var passedTestset = 0;

    // loop some for check data
    testsetResult.some((testset) => {
      if (testset.compilelogCompileStatus == "Passed") {
        passedTestset += 1;
        sumScore += doesGetTaskAll.taskScore / maxTestset;
      } else if (testset.compilelogCompileStatus == "Error") {
        compilelogErrorMessage = testset.compilelogErrorMessage;
        return true;
      } else {
      }
    });

    // pass sumScore to compilelogScore
    createCompileLogData.compilelogScore = Math.round(sumScore);

    // check passedTestset and maxTestset is equal?
    if (passedTestset == maxTestset) {
      createCompileLogData.compilelogTestResult = "Accepted";
    } else if (compilelogErrorMessage != "") {
      createCompileLogData.compilelogErrorMessage = compilelogErrorMessage;
      createCompileLogData.compilelogTestResult = "Compile Error";
    } else {
      createCompileLogData.compilelogTestResult = "Wrong Answer";
    }

    // try call insert function in global model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: "compilelogs",
        insertData: [createCompileLogData],
      });
      res.status(200).send({ createCompileLogData });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
