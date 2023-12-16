const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "ashraf",
  port: 5432,
  database: "postgres",
});

module.exports = pool;
