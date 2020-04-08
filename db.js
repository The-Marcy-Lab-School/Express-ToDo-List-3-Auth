const { Pool } = require('pg');

const pool = new Pool({
  user: 'ec2-user',
  host: '/var/run/postgresql',
  database: 'user_tasklist',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
