const createError = require("http-errors");
const tagsModel = require("../models/tag");
module.exports = {
  // function name: create
  // description: create tag by API
  // input: tagName, tagStatus, tagCreateby , tagUpdateBy
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2021
  create: async (req, res, next) => {
    // define variable json as object
    var jsonData = {};

    // passing data to json variable
    jsonData.tagName = req.body.tagName;
    jsonData.tagStatus = req.body.tagStatus;

    // passing Create and update by tagCreateBy
    jsonData.tagCreateBy = req.params.tagCreateBy;
    jsonData.tagUpdateBy = req.params.tagCreateBy;

    // try call function createTag in tags model then catch if error
    try {
      const doseCreate = await tagsModel.createTag(jsonData);
      res.status(201).send({ doseCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: update
  // desxription: update tag by API from tagId
  // input: tagId
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 15/1/2021
  update: async (req, res, next) => {
    try {
      const message = "update_tag: route allowed";
      res.send({ message });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: delete
  // description: delete tag by API from create by id
  // input: tagId
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2021
  delete: async (req, res, next) => {
    // define variable json as object
    var jsonData = {};

    // passing data to json variable
    jsonData.tagId = req.params.tagId;
    jsonData.tagCreateBy = req.params.tagCreateBy;

    // try call function deleteTag in tags model then catch if error
    try {
      const doseDelete = await tagsModel.deleteTag(jsonData);
      res.status(200).send({ doseDelete });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: getAll
  // description: get all tag
  // input : -
  // output : all tag in database
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2021
  getAll: async (req, res, next) => {
    // try call function getAlltag in tags model then catch if error
    try {
      const doseGetAll = await tagsModel.getAlltag();
      res.status(200).send({ doseGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: getTag
  // description: get single tag
  // input : tagId
  // output : tagId, tagName, tagStatus, tagCreateDate, tagUpdateDate, tagCreateBy, tagUpdateBy
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2021
  getTag: async (req, res, next) => {
    // define variable json as object
    var jsonData = {};

    // passing data to json variable
    jsonData.tagId = req.params.tagId;
    jsonData.tagCreateBy = req.params.tagCreateBy;

    // try call function getTagById in tags model then catch if error
    try {
      const doseGetAll = await tagsModel.getTagById(jsonData);
      res.status(201).send({ doseGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: getAllById
  // description: get all tag by tagCreateBy
  // input : tagCreateBy
  // output : all tag create by tagCreateBy
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2021
  getAlltagById: async (req, res, next) => {
    // define variable json as object
    var jsonData = {};

    // passing data to json variable
    jsonData.tagCreateBy = req.params.tagCreateBy;
    // try call function getAlltagById in tags model then catch if error
    try {
      const doseGetAllById = await tagsModel.getAlltagById(jsonData);
      res.status(200).send({ doseGetAllById });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
