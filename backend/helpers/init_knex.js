const knex = require('knex')({
  client: process.env.KNEX_CLIENT,
  connection: {
    host: process.env.KNEX_HOST,
    user: process.env.KNEX_USER,
    password: process.env.KNEX_PASSWORD,
    database: process.env.KNEX_DATABASE
  }
})
module.exports = knex
