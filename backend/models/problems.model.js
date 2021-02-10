const knex = require("./../helpers/init_knex");
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
  insert: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        knex.transaction(function (trx) {
            knex("problems")
              .transacting(trx)
              .insert({ name: "Old Books" })
              .then(function (resp) {
                const id = resp[0];
                return someExternalMethod(id, trx);
              })
              .then(trx.commit)
              .catch(trx.rollback);
          })
          .then(function (resp) {
            console.log("Transaction complete.");
          })
          .catch(function (err) {
            console.error(err);
          });
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
