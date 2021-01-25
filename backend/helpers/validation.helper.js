const joi = require("@hapi/joi");

const authSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required(),
});

// create tag schema
const createTagSchema = joi.object({
  tagName: joi.string().max(255).required(),
  tagStatus: joi.number().integer().max(3).required(),
  tagCreateBy: joi.number().integer().max(99999999).min(1).required(),
  tagUpdateBy: joi.number().integer().max(99999999).min(1).required(),
});

// get tag schema
const getTagSchema = joi.object({
  tagId: joi.number().max(8),
  tagCreateBy: joi.number().integer().max(99999999).min(1),
});

// filter update params schema
const updateTagConditionSchema = joi.object({
  tagId: joi.number().integer().max(99999999),
});

// update tag schema
const updateTagSchema = joi.object({
  tagId: joi.number().integer().max(99999999),
  tagName: joi.string().max(255),
  tagUpdateDate: joi.date().timestamp(),
  tagUpdateBy: joi.number().max(99999999).min(1),
  tagCreateBy: joi.number().max(99999999).min(1),
  tagStatus: joi.number().integer().max(3),
});

module.exports = {
  authSchema,
  createTagSchema,
  getTagSchema,
  updateTagConditionSchema,
  updateTagSchema,
};
