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
  insertReturnId: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const id = knex(table.name)
          .insert(table.insertData)
          .then(function (ret) {
            var id = ret[0];
            resolve(id);
          });

        console.log(id.lenght);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
  insert: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        knex
          .transaction(function (trx) {
            knex(table.name1)
              .transacting(trx)
              .insert(table.insertData1)
              .then(function (response) {
                return knex(table.name2)
                  .transacting(trx)
                  .insert(table.insertData2);
              })
              .then(function (response) {
                return knex(table.name3)
                  .transacting(trx)
                  .insert(table.insertData3);
              })
              .then(function (response) {
                return knex(table.name4)
                  .transacting(trx)
                  .insert(table.insertData4);
              })
              .then(function (response) {
                return knex(table.name5)
                  .transacting(trx)
                  .insert(table.insertData5);
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
