const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "password",
  port: "5432",
  database: "shortUrl",
});

module.exports = pool;
