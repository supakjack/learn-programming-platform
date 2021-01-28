const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  createTagSchema,
  getTagSchema,
  updateTagConditionSchema,
  updateTagSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  // function name: create
  // description: create tag by API
  // input: tagName, tagStatus, tagCreateby , tagUpdateBy
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 25/1/2021
  create: async (req, res, next) => {
    // passing data from body and valid by createTagSchema
    const createTagData = await createTagSchema.validateAsync(req.body);

    // try call function createTag in tags model then catch if error
    try {
      const doseCreate = await globalModel.insert({
        name: "tags",
        insertData: [createTagData],
      });
      res.status(200).send({ doseCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: update
  // desxription: update tag by condition
  // input: condition when update / condition: {tagId, tagName, tagUpdateDate, tagUpdateBy, tagCreateBy, tagStatus }
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 25/1/2021
  update: async (req, res, next) => {
    const updateCondition = await updateTagConditionSchema.validateAsync(
      req.query
    );
    const updateTagData = await updateTagSchema.validateAsync(req.body);

    // try call function deleteTag in tags model then catch if error
    try {
      const doseUpdate = await globalModel.update({
        name: "tags",
        condition: [updateCondition],
        updateData: [updateTagData],
      });
      res.status(200).send({ doseUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: get
  // description: get tag data from condition by id ortagCreateBy or both
  // input : query string : condition {tagId , tagCreateBy}
  // output : tagId, tagName, tagStatus, tagCreateDate, tagUpdateDate, tagCreateBy, tagUpdateBy
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 25/1/2021
  get: async (req, res, next) => {
    // passing data from query string validate data from getTagSchema
    const getTagData = await getTagSchema.validateAsync(req.query);

    // try call function getTagById in tags model then catch if error
    try {
      const doseGetAll = await globalModel.select({
        name: "tags",
        condition: [getTagData],
      });
      res.status(201).send({ doseGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
