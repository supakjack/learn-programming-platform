const createError = require("http-errors");
const { comileLogic } = require("./../helpers/compile.helper");
const nanoid = require("nanoid");
const mkdirp = require("mkdirp");
const path = require("path");

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
    const yearName = req.body.yearName,
      courseCode = req.body.courseCode,
      sectionNumber = req.body.sectionNumber,
      assignmentTitle = req.body.assignmentTitle,
      problemTitle = req.body.problemTitle,
      userUsername = req.body.userUsername,
      taskId = req.body.taskId,
      memeFile = req.body.memeFile,
      singleFile = req.files.singleFile;
    const no = 1;
    try {
      singleFile.name = nanoid(6) + "." + memeFile;
      // console.log(singleFile.name);
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

      await singleFile.mv(filePath + "\\" + singleFile.name);

      res.status(200).send(req.files);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
