const createError = require("http-errors");
const globalModel = require("../models/global.model");
const multer = require("multer");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const { userSchema } = require("../helpers/validation.helper");
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).single("file");
module.exports = {
  findAll: async (req, res, next) => {
    console.log("get user2");
    const getUserData = await userSchema.validateAsync(req.query);
    try {
      console.log("get user");
      const doesGetAll = await globalModel.select({
        name: "users",
        condition: [getUserData],
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
    const updateUserSchema = await updateUserSchema.validateAsync(req.query);
    const updateUser = await userSchema.validateAsync(req.body);
    try {
      const doesUpdate = await globalModel.update({
        name: "users",
        condition: [updateUserSchema],
        updateData: [updateUser],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  /** API path that will upload the files */
  upload: async (req, res, next) => {
    var exceltojson;
    upload(req, res, function (err) {
      console.log(req.files);
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: "No file passed" });
        return;
      }
      /** Check the extension of the incoming file and
       *  use the appropriate module
       */
      if (
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ] === "xlsx"
      ) {
        exceltojson = xlsxtojson;
      } else {
        exceltojson = xlstojson;
      }
      console.log(req.file.path);
      try {
        exceltojson(
          {
            input: req.file.path,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true,
          },
          function (err, result) {
            if (err) {
              return res.json({ error_code: 1, err_desc: err, data: null });
            }
            res.json({ error_code: 0, err_desc: null, data: result });
          }
        );
      } catch (e) {
        res.json({ error_code: 1, err_desc: "Corupted excel file" });
      }
    });
  },

  file: async (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
  },
};
