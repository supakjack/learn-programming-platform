const knex = require("../helpers/init_knex");
const createError = require("http-errors");

module.exports = {
  select: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doesSelect = knex.select(table.filter).from(table.name);
        if (table.condition) {
          table.condition.forEach((condition) => {
            doesSelect.where(condition);
          });
        }
        resolve(doesSelect);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
  insertReturnId: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const id = knex(table.name)
          .insert(table.insertData)
          .then(function (ret) {
            var id = ret[0];
            resolve(id);
          });
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
