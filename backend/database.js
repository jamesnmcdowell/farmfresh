const pg = require('pg-promise')();
const dbConfig = 'postgres://james@localhost:5432/farmfresh';
// const dbConfig = process.env.DATABASE_URL;
const db = pg(dbConfig);

module.exports = db;