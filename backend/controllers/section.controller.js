const createError = require("http-errors");
const knex = require("./../helpers/init_knex");
const globalModel = require("../models/global.model");

module.exports = {
  add: async (req, res, next) => {
    try {
      knex("sections")
        .insert({
          sectionNumber: req.body.sectionNumber,
          sectionCourseId: req.body.sectionCourseId,
          sectionCreateBy: req.body.sectionCreateBy,
          sectionUpdateBy: req.body.sectionUpdateBy,
          sectionStatus: req.body.sectionStatus,
        })
        .then(async (ret) => {
          const sectionId = ret[0];
          const doesInsert = await globalModel.insert({
            name: "enrolls",
            insertData: [
              {
                enrollUserId: req.body.sectionCreateBy,
                enrollSectionId: sectionId,
                enrollRole: 2,
                enrollCreateBy: req.body.sectionCreateBy,
                enrollUpdateBy: req.body.sectionCreateBy,
              },
            ],
          });
          res.status(201).send({ doesInsert });
        });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const doesUpdate = await globalModel.update({
        name: "sections",
        condition: [{ sectionId: req.body.sectionId }],
        updateData: [req.body],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      console.log(error);
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
