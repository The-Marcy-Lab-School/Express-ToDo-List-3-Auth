const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL
    || 'postgresql://enmanuel@/var/run/postgresql:5432/todo_api',
});

module.exports = { query: (text, params) => pool.query(text, params) };
