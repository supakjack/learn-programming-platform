const createError = require("http-errors");
const globalModel = require("../models/global.model");
const {
  userSchema,
  updateUserConditionSchema,
  updateUserSchema,
  FileuserSchema,
  createUserSchema,
} = require("./../helpers/validation.helper");
const nanoid = require("nanoid");
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  findAll: async (req, res, next) => {
    // const getUserData = await userSchema.validateAsync(req.query);
    try {
      const doesGetAll = await globalModel.select({
        name: "users",
        // condition: [getUserData],
      });
      // console.log(doesGetAll);
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      const doesGet = await globalModel.select({
        name: "users",
        // condition: [getUserData],
      });
      // console.log(doesGetAll);
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  create: async (req, res, next) => {
    console.log(req.body);
    // const addUserData = await createUserSchema.validateAsync(req.body);
    // console.log(addUserData);
    try {
      const doesCreate = await globalModel.insert({
        name: "users",
        insertData: [req.body],
      });
      res.status(200).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  update: async (req, res, next) => {
    console.log(req.query);
    console.log(req.body);
    const updateCondition = await updateUserConditionSchema.validateAsync(
      req.query
    );
    // const updateUserData = await updateUserSchema.validateAsync(req.body);
    try {
      const doesUpdate = await globalModel.update({
        name: "users",
        condition: [updateCondition],
        updateData: [req.body],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  upload: async (req, res, next) => {
    console.log("filesssssss");
    console.log(req);
    const singleFile = req.files ? req.files.file : null;
    const randomFileName = nanoid(10);
    const splitFileName = singleFile.name.split(".");
    singleFile.name = randomFileName + "." + splitFileName[1];
    const filePath = process.env.BASE_STORAGE_PATH + "temp";
    await singleFile.mv(filePath + "\\" + singleFile.name);

    let path = "..\\storages\\temp\\" + singleFile.name;
    // D:\Software Engineering Project\learn-programming-platform\storages\temp

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let users = [];
      rows.forEach((row) => {
        let user = {
          userUsername: row[0],
          userPrefixThai: row[1],
          userFirstnameThai: row[2],
          userLastnameThai: row[3],
        };
        users.push(user);
      });
      console.log(users);
      try {
        const doesCreate = globalModel.insert({
          name: "users",
          insertData: users,
        });
        res.status(200).send({ doesCreate });
      } catch (error) {
        if (error.isJoi === true)
          return next(createError.InternalServerError());
        next(error);
      }
    });
  },
};
