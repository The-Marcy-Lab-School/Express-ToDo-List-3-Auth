const { Pool } = require('pg');

const pool = new Pool({
  host: '/var/run/postgresql',
  user: 'postgres',
  database: 'to_do',
  password: '',
  port: 5432,
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
