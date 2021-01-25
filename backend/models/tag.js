const knex = require("../helpers/init_knex");
const createError = require("http-errors");

module.exports = {
  // function name: createTag
  // description: create tag model API
  // input: tagName, tagStatus, tagCreateBy, tagUpdateBy
  // output: tagId
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 15/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2121
  createTag: async (data) => {
    return new Promise((resolve, reject) => {
      // try to create insert SQL query into tags table with tagname,
      // tagStatus, tagCreateBy and tagUpdate then catch if error
      try {
        const doseCreateTag = knex
          .insert(
            [
              {
                tagName: data.tagName,
                tagStatus: data.tagStatus,
                tagCreateBy: data.tagCreateBy,
                tagUpdateBy: data.tagUpdateBy,
              },
            ],
            ["tagId"]
          )
          .into("tags");
        resolve(doseCreateTag);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },

  // function name: getAlltag
  // description: get all tag
  // input: -
  // output: all tag data
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 15/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 18/1/2121
  getAlltag: async () => {
    return new Promise((resolve, reject) => {
      // try to select * from tagsfrom tags table then catch if error
      try {
        const doseGetAllTag = knex.select().from("tags").timeout(1000);
        resolve(doseGetAllTag);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },

  // function name: getAlltagById
  // description: get all tag by tagCreateBy
  // input: tagCreateBy
  // output: all tag from creator
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 19/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2121
  getAlltagById: async (data) => {
    return new Promise((resolve, reject) => {
      // try to select * from tags from tags table where tagcreateBy = ? then catch if error
      try {
        const doseGetAllTagById = knex("tags").where(
          "tagCreateBy",
          data.tagCreateBy
        );
        resolve(doseGetAllTagById);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },

  // function name: getTagById
  // description: get tag by tagId
  // input: tagCreateBy , tagId
  // output: single tag by tagCreateId
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 19/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2121
  getTagById: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const doseGetTagById = knex("tags").where({
          tagCreateBy: data.tagCreateBy,
          tagId: data.tagId,
        });
        resolve(doseGetTagById);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },

  // function name: deleteTag
  // description: delete tag model by tagId
  // input: tagId
  // output: text response
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 15/1/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 19/1/2121
  deleteTag: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const doseDeleteTag = knex("tags")
          .where({
            tagCreateBy: data.tagCreateBy,
            tagStatus: "delete",
            tagId: data.tagId,
          })
          .del();
        resolve(doseDeleteTag);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
