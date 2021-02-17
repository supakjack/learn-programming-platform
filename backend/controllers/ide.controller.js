const createError = require("http-errors");
const { comileLogic } = require("./../helpers/compile.helper");
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

      // const doesCompile = await comileLogic(
      //   "cpp",
      //   "path",
      //   "1\n2",
      //   null,
      //   filePath + "\\" + singleFile.name
      // );
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
  // UpdateBy: Theo Seathan / UpdateDate: 5/2/2021
  create: async (req, res, next) => {
    // passing data from body and valid by createTagSchema
    const createCompileLogData = await creteCompileLogSchema.validateAsync(
      req.body
    );

    // try call function createTag in global model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: "compilelogs",
        insertData: [createCompileLogData],
      });
      res.status(200).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
