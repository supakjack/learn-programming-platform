const createError = require("http-errors");
const globalModel = require("../models/global.model");
const {
  userSchema,
  updateUserConditionSchema,
  updateUserSchema,
} = require("../helpers/validation.helper");
const nanoid = require("nanoid");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  findAll: async (req, res, next) => {
    // const getUserData = await userSchema.validateAsync(req.query);
    try {
      const doesGetAll = await globalModel.select({
        name: "users",
        // condition: [getUserData],
      });
      console.log(doesGetAll);
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  create: async (req, res, next) => {
    const addUserData = await userSchema.validateAsync(req.body);
    try {
      const doesCreate = await globalModel.insert({
        name: "users",
        insertData: [addUserData],
      });
      res.status(200).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  update: async (req, res, next) => {
    const updateCondition = await updateUserConditionSchema.validateAsync(
      req.query
    );
    const updateUserData = await updateUserSchema.validateAsync(req.body);
    // try call function deleteTag in global model then catch if error
    try {
      const doesUpdate = await globalModel.update({
        name: "users",
        condition: [updateCondition],
        updateData: [updateUserData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  file: async (req, res, next) => {
    const singleFile = req.files ? req.files.excelFile : null;

    // console.log(req.files);
    const randomFileName = nanoid(10);
    const splitFileName = singleFile.name.split(".");
    // console.log(randomFileName);
    // console.log(splitFileName);
    singleFile.name = randomFileName + "." + splitFileName[1];
    // console.log(singleFile.name);
    const filePath = process.env.BASE_STORAGE_PATH + "temp";
    await singleFile.mv(filePath + "\\" + singleFile.name);
    // console.log(singleFile);

    try {
      console.log("try");
      if (req.files == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path = filePath + singleFile.name;
      console.log(path);

      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();

        let users = [];

        rows.forEach((row) => {
          let user = {
            id: row[0],
            title: row[1],
            description: row[2],
            published: row[3],
          };

          users.push(user);
        });

        User.bulkCreate(users)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.files,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.files.name,
      });
    }
  },
};
