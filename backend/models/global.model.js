const knex = require("./../helpers/init_knex");
const createError = require("http-errors");

module.exports = {
  insert: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseInsert = knex(table.name).insert(table.insertData);
        resolve(doseInsert);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
  select: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseSelect = knex.select(table.filter).from(table.name);
        if (table.leftJoin) {
          table.leftJoin.forEach((leftJoin) => {
            doseSelect.leftJoin(
              leftJoin.joinTable,
              table.name + "." + leftJoin.leftKey,
              leftJoin.joinTable + "." + leftJoin.joinKey
            );
          });
        }
        if (table.condition) {
          table.condition.forEach((condition) => {
            doseSelect.where(condition);
          });
        }
        if (table.whereNot) {
          table.whereNot.forEach((whereNot) => {
            doseSelect.whereNot(whereNot);
          });
        }
        resolve(doseSelect);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
  update: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseUpdate = knex(table.name);
        if (table.condition) {
          table.condition.forEach((condition) => {
            doseUpdate.where(condition);
          });
          if (table.updateData) {
            table.updateData.forEach((updateData) => {
              doseUpdate.update(updateData);
            });
          }
        }

        resolve(doseUpdate);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
  delete: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseDelete = knex(table.name).where(table.condition).del();
        resolve(doseDelete);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
