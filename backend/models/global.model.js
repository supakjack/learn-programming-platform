const knex = require("./../helpers/init_knex");
const createError = require("http-errors");

module.exports = {
  // function name: insert
  // description: insert global model
  // input : table data and schema from controller
  // output : primary key id
  // CreateBy: Supak pukdam / UpdateDate: 4/2/2021
  // CreateBy: Supak pukdam / UpdateDate: 4/2/2021
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
  // function name: select
  // description: select data from database
  // input : table data and schema from controller
  // output : base on tabel schema field filter if doesn't use filter will default use on `select *`
  // CreateBy: Supak pukdam / CreateDate: 4/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 4/2/2021
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
  // function name: update
  // description: update data to database using knex syntax
  // input : table data and schema from controller
  // output : primary key that updated
  // CreateBy: Supak pukdam / CreateDate: 1/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 1/2/2021
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
  // function name: delete
  // description: delete data in databse
  // input : table data and schema fro mcontroller
  // output : primary key that deleted
  // CreateBy: Supak pukdam / CreateDate: 4/2/2021
  // CreateBy: Supak pukdam / UpdateDate: 4/2/2021
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
