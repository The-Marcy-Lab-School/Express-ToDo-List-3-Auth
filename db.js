const { Pool } = require('pg');

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: 'carmensalas',
  host: 'localhost',
  database: 'todo',
  password: null,
  port: 5432,
});

// pool.query('SELECT * FROM task;').then((data) => console.log(data));

module.exports = {
  query(text, params) {
    return pool.query(text, params);
  },
};
