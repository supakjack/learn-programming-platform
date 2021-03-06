const createError = require("http-errors");
const globalModel = require("../models/global.model");
const problemsModel = require("../models/problems.model");

const {
  userSchema,
  getUserIdSchema,
  updateUserSchema,
  FileuserSchema,
  createUserSchema,
  userIdConditionSchema,
  getUserFromCourseSchema,
} = require("./../helpers/validation.helper");
const nanoid = require("nanoid");
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  findById: async (req, res, next) => {
    const getUserData = await getUserIdSchema.validateAsync(req.query);
    try {
      const doesGet = await globalModel.select({
        name: "users",
        condition: [getUserData],
      });
      res.status(201).send({ doesGet });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const doesGetAll = await globalModel.select({
        name: "users",
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  create: async (req, res, next) => {
    console.log(req.body);
    // const userData = await userSchema.validateAsync(req.body);
    // console.log(userData);
    try {
      const doesCreateUser = await problemsModel.insertReturnId({
        name: "users",
        insertData: [
          {
            userUsername: req.body.userUsername,
            userPrefixThai: req.body.userPrefixThai,
            userFirstnameThai: req.body.userFirstnameThai,
            userLastnameThai: req.body.userLastnameThai,
            userPrefixEnglish: req.body.userPrefixEnglish,
            userFirstnameEnglish: req.body.userFirstnameEnglish,
            userLastnameEnglish: req.body.userLastnameEnglish,
            userStatus: req.body.userStatus,
            userCreateBy: req.body.userCreateBy,
            userUpdateBy: req.body.userUpdateBy,
          },
        ],
      });
      console.log(doesCreateUser);

      const doesCreateEnrollByUserId = await globalModel.insert({
        name: "enrolls",
        insertData: [
          {
            enrollUserId: doesCreateUser,
            enrollSectionId: req.body.sectionId,
            enrollRole: "student",
            enrollStatus: req.body.userStatus,
            enrollCreateBy: req.body.userCreateBy,
            enrollUpdateBy: req.body.userUpdateBy,
          },
        ],
      });

      res.status(200).send({ doesCreateUser, doesCreateEnrollByUserId });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  update: async (req, res, next) => {
    const updateCondition = await getUserIdSchema.validateAsync(req.query);
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
    console.log(req.files);
    console.log("req.body" + req.body);
    const singleFile = req.files ? req.files.singleFile : null;
    const randomFileName = nanoid(10);
    console.log(singleFile);
    const splitFileName = singleFile.name.split(".");
    singleFile.name = randomFileName + "." + splitFileName[1];
    const filePath = process.env.BASE_STORAGE_PATH + "temp";
    await singleFile.mv(filePath + "\\" + singleFile.name);

    let path = "..\\storages\\temp\\" + singleFile.name;

    readXlsxFile(path).then(async (rows) => {
      rows.shift();
      let users = [];
      rows.forEach((row) => {
        let user = {
          userUsername: row[0],
          userPrefixThai: row[1],
          userFirstnameThai: row[2],
          userLastnameThai: row[3],
          userCreateBy: req.body.userId,
          userUpdateBy: req.body.userId,
        };
        users.push(user);
      });
      // console.log(users);
      try {
        const doesCreate = await problemsModel.insertReturnId({
          name: "users",
          insertData: users,
        });

        console.log(doesCreate);

        const doesCreateEnrollByUserId = await globalModel.insert({
          name: "enrolls",
          insertData: [
            {
              enrollUserId: doesCreate,
              enrollSectionId: req.body.sectionId,
              enrollRole: "student",
              enrollStatus: 1,
              enrollCreateBy: req.body.userId,
              enrollUpdateBy: req.body.userId,
            },
          ],
        });

        res.status(200).send({ doesCreate, doesCreateEnrollByUserId });
      } catch (error) {
        if (error.isJoi === true)
          return next(createError.InternalServerError());
        next(error);
      }
    });
  },
  getUserByCourse: async (req, res, next) => {
    console.log("getUserByCourse");
    // console.log(req.body);
    const getUserData = await getUserFromCourseSchema.validateAsync(req.body);
    console.log(getUserData);
    try {
      const doesGetAll = await globalModel.select({
        name: "users",
        condition: [
          { userCreateBy: getUserData.userId },
          { sectionId: getUserData.sectionId },
        ],
        leftJoin: [
          {
            joinTable: "enrolls",
            leftTableName: "users",
            leftKey: "userId",
            joinKey: "enrollUserId",
          },
          {
            joinTable: "sections",
            leftTableName: "enrolls",
            leftKey: "enrollSectionId",
            joinKey: "sectionId",
          },
        ],
      });
      console.log(doesGetAll);
      res.status(200).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
