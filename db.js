const { Pool } = require('pg');

// For deploying Heroku app later on
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
const pool = new Pool({
  host: '/var/run/postgresql',
  user: 'ubuntu',
  database: 'todos',
  port: 5432,
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
