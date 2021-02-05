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
        const doesInsert = knex(table.name).insert(table.insertData);
        resolve(doesInsert);
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
        const doesSelect = knex.select(table.filter).from(table.name);
        if (table.leftJoin) {
          table.leftJoin.forEach((leftJoin) => {
            if (leftJoin.as) {
              doesSelect.leftJoin(
                leftJoin.tableAs,
                table.name + "." + leftJoin.leftKey,
                leftJoin.as + "." + leftJoin.joinKey
              );
            } else {
              doesSelect.leftJoin(
                leftJoin.joinTable,
                table.name + "." + leftJoin.leftKey,
                leftJoin.joinTable + "." + leftJoin.joinKey
              );
            }
          });
        }
        if (table.condition) {
          table.condition.forEach((condition) => {
            doesSelect.where(condition);
          });
        }
        if (table.whereNot) {
          table.whereNot.forEach((whereNot) => {
            doesSelect.whereNot(whereNot);
          });
        }
        resolve(doesSelect);
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
        const doesUpdate = knex(table.name);
        if (table.condition) {
          table.condition.forEach((condition) => {
            doesUpdate.where(condition);
          });
          if (table.updateData) {
            table.updateData.forEach((updateData) => {
              doesUpdate.update(updateData);
            });
          }
        }
        resolve(doesUpdate);
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
        const doesDelete = knex(table.name).where(table.condition).del();
        resolve(doesDelete);
      } catch (error) {
        console.log(error.message);
        reject(createError.InternalServerError());
      }
    });
  },
};
