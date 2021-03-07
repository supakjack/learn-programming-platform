const createError = require("http-errors");
const globalModel = require("../models/global.model");

const { getHashtagSchema } = require("../helpers/validation.helper");

module.exports = {
  // function name: get
  // description: get hashtag data from condition by id orhashtagCreateBy or both
  // input : query string : condition {hashtagId , hashtagCreateBy}
  // output : hashtagId, hashtagName, hashtagStatus, hashtagCreateDate, hashtagUpdateDate, hashtagCreateBy, hashtagUpdateBy
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 14/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 5/2/2021
  get: async (req, res, next) => {
    // passing data from query string validate data from getTagSchema
    const gethashtagData = await getHashtagSchema.validateAsync(req.query);

    // try call function getTagById in global model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "hashtags",
        condition: [gethashtagData],
        whereNot: [{ hashtagStatus: "delete" }],
        filter: [
          // "hashtagId",
          "hashtagTagId as tagId",
          // "hashtagProblemId",
          // "hashtagStatus",
          // "hashtagCreateDate",
          // "hashtagUpdateDate",
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
