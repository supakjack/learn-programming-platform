const knex = require("../helpers/init_knex");
const createError = require("http-errors");

module.exports = {
  select: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseSelect = knex.select(table.filter).from(table.name);
        if (table.condition) {
          table.condition.forEach((condition) => {
            doseSelect.where(condition);
          });
        }
        resolve(doseSelect);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
