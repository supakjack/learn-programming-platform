const createError = require("http-errors");
const globalModel = require("../models/global.model");
const {
  getAssignmentSchema,
  createAssignmentSchema,
  updateAssignmentConditionSchema,
  updateAssignmentSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  // function name: create
  // description: create Assignment by API
  // input: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
  // output: text response
  // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
  // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

  create: async (req, res, next) => {
    const createAssignmentData = await createAssignmentSchema.validateAsync(
      req.body.createAssignmentData
    );

    try {
      const doesCreate = await globalModel.insert({
        name1: "assignments",
        name2: "sections",

        // leftJoin: [
        //   {
        //     joinTable: "sections",
        //     leftTableName: "assignments",
        //     leftKey: "assignmentId",
        //     joinKey: "assignmentSectionId",
        //   },
        // ],

        insertData1: [req.body],
        insertData2: [req.body],
      });
      res.status(201).send(req.body);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: get
  // description: create Assignment by API
  // input: query string : condition {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
  // output: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
  // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
  // UpdateBy: Niphitphon Thantkulkit / UpdateDate: 28/2/2021

  get: async (req, res, next) => {
    // passing data from query string validate data from
    const getAssignmentData = await getAssignmentSchema.validateAsync(
      req.query
    );

    try {
      const doesGetAll = await globalModel.select({
        name: "assignments",
        condition: [getAssignmentData],
        whereNot: [{ assignmentStatus: "delete" }],
        condition: [getAssignmentData],
        filter: [
          "assignmentId",
          "assignmentTitle",
          "assignmentDescription",
          "assignmentStartDate",
          "assignmentEndDate",
          "assignmentStatus",
        ],

        // leftJoin: [
        //   {
        //     joinTable: "sections",
        //     leftKey: "asssignmentSectionId",
        //     joinKey: "sectionCourseId",
        //   },

        //   {
        //     joinTable: "enrolls",
        //     leftKey: "sectionCourseId",
        //     joinKey: "enrollSectionId",
        //   },
        // ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  // function name: update
  // desxription: update Assignment by condition
  // input: condition when update / condition: {assingmetTitle, assingmentDescription, assingmentStartDate, assingmentEndDate ,assingmentStatus}
  // output: text response
  // CreateBy: Atikom Wongwan / CreateDate: 19/2/2021
  // UpdateBy: Atikom Wongwan / UpdateDate: 19/2/2021

  update: async (req, res, next) => {
    const updateCondition = await updateAssignmentConditionSchema.validateAsync(
      req.query
    );
    const updateAssignmentData = await updateAssignmentSchema.validateAsync(
      req.body
    );
    // try call function deleteAssignment in global model then catch if error
    try {
      const doesUpdate = await globalModel.update({
        name: "assignments",
        condition: [updateCondition],
        updateData: [updateAssignmentData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
