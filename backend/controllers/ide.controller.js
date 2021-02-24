const createError = require("http-errors");
const { comileLogic } = require("./../helpers/compile.helper");
const { create } = require("./../helpers/createLog.helper");
const globalModel = require("../models/global.model");
const nanoid = require("nanoid");
const mkdirp = require("mkdirp");
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
      console.log(source);
      let resultStdin = stdin.replace(/,/g, "\n");
      console.log(resultStdin);
      if (source) {
        console.log("1");
        const doesCompile = await comileLogic(
          "cpp",
          "source",
          null,
          source,
          null
        );
      } else {
        singleFiles.name = await nanoid(6);
        console.log(singleFiles.name + ".cpp");
        const filePath = process.env.BASE_STORAGE_PATH + "justRun";
        await mkdirp(filePath);
        await singleFiles.mv(filePath + "\\" + singleFiles.name + ".cpp");
        const path = filePath + "\\" + singleFiles.name + ".cpp";
        const doesCompile = await comileLogic(
          "cpp",
          "path",
          resultStdin,
          source,
          path
        );
        let result = fs.unlinkSync(filePath + "\\" + singleFiles.name + ".cpp");
        console.log("delete success");
        console.log(doesCompile);
        // expected output: "Success!"
        res.status(200).send(doesCompile);
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
      //   compilelogTaskId: taskId,
      //   compilelogSubmitNo: SubmitNo,
      //   compilelogTestResult,
      // compilelogErrorMessage,
      // compilelogCompileStatus,
      compileloglanguage: language,
      //   compilelogFileId: fileId,
      //   compilelogCreateBy: compilelogCreateBy,
      //   compilelogUpdateBy: compilelogUpdateBy,
    };
    console.log(createCompileLogData);

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
        // createCompileLogData.compilelogCompileStatus ;
      } else if (
        doesCompile.stdout != doesGetTestset[0].testsetOutput &&
        doesCompile.stderr == ""
      ) {
        createCompileLogData.compilelogCompileStatus = "Failed";
        createCompileLogData.compilelogErrorMessage = doesCompile.stderr;
        // res.status(200).send("fail");
      } else {
        createCompileLogData.compilelogCompileStatus = "Error";
        createCompileLogData.compilelogErrorMessage = doesCompile.stderr;
        // res.status(200).send(doesCompile.strderr);
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

    console.log(req.files);
    try {
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
      const number = doesSelect.map((rowFile) => {
        const index = rowFile.filePath.search("no-");
        const file = rowFile.filePath
          .substr(index + 3, rowFile.length)
          .split("\\");
        return Number(file[0]);
      });
      const lastNumber = Math.max(...number);

      const no = lastNumber + 1;

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

      if (sourceCode) {
        await fs.writeFile(
          filePath + "\\" + "main" + memeFile,
          JSON.stringify(sourceCode)
        );

        const fileName = await writeFileLogic(sourceCode, single, memeFile);

        // schema files table
        const createFilesData = await createFiles.validateAsync({
          filePath: filePath + "\\" + fileName,
          fileCreateBy,
          fileUpdateBy,
        });

        // insert to files table
        const doesCreateLog = await globalModel.insert({
          name: "files",
          insertData: [createFilesData],
        });
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
            const doesCreateLog = await globalModel.insert({
              name: "files",
              insertData: [createFilesData],
            });
          });
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
          const doesCreateLog = await globalModel.insert({
            name: "files",
            insertData: [createFilesData],
          });
        }
      }

      res.status(200).send(singleFile);
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
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 18/2/2021
  create: async (req, res, next) => {
    // passing data from body and valid by createTagSchema

    var doesGetTaskAll = await globalModel.select({
      name: "tasks",
      condition: [{ taskId: req.body.compilelogTaskId }],
    });

    doesGetTaskAll = doesGetTaskAll[0];
    // console.log(doesGetTaskAll);

    const createCompileLogData = {
      compilelogTaskId: req.body.compilelogTaskId,
      compilelogSubmitNo: req.body.compilelogSubmitNo,
      // compilelogTestResult,
      // compilelogErrorMessage,
      // compilelogCompileStatus,
      // compilelogScore,
      compileloglanguage: req.body.compileloglanguage,
      compilelogFileId: req.body.compilelogFileId,
      compilelogCreateBy: req.body.compilelogCreateBy,
      compilelogUpdateBy: req.body.compilelogCreateBy,
    };

    const testsetResult = req.body.testsetResult;
    // console.log(testsetResult);
    var sumScore = 0;
    var maxTestset = testsetResult.length;
    var passedTestset = 0;
    testsetResult.every((testset) => {
      if (testset.compilelogCompileStatus == "Passed") {
        passedTestset += 1;
        sumScore += doesGetTaskAll.taskScore / maxTestset;
      } else if (testset.compilelogCompileStatus == "Error") {
        createCompileLogData.compilelogErrorMessage =
          testset.compilelogErrorMessage;
        // return false;
      } else {
        console.log(passedTestset);
      }
    });
    console.log(passedTestset);
    createCompileLogData.compilelogScore = sumScore;

    if (passedTestset == maxTestset) {
      createCompileLogData.compilelogTestResult = "Accepted";
      console.log(createCompileLogData.compilelogTestResult);
    } else if (createCompileLogData.compilelogErrorMessage != "") {
      createCompileLogData.compilelogTestResult = "Compile Error";
    } else {
      createCompileLogData.compilelogTestResult = "Wrong Answer";
    }
    console.log(maxTestset, passedTestset, sumScore);

    res.status(200).send(createCompileLogData);
    // try call function createTag in global model then catch if error
    // try {
    //   const doesCreate = await globalModel.insert({
    //     name: "compilelogs",
    //     insertData: [createCompileLogData],
    //   });
    //   res.status(200).send({ doesCreate });
    // } catch (error) {
    //   if (error.isJoi === true) return next(createError.InternalServerError());
    //   next(error);
    // }
  },
};
