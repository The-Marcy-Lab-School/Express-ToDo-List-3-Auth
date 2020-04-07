const pool = require('../../db')

async function getAllIncompletedTasks(req, res) {
  try {
    const user_id = req.userId
    const queryText = 'SELECT * FROM tasks WHERE is_complete = false AND user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send('My bad');
  }
}

async function getAllCompletedTasks(req, res) {
  try {
    const user_id = req.userId
    const queryText = 'SELECT * FROM tasks WHERE is_complete = true AND user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}

async function getAllTasks(req, res) {
  try {
    const user_id = req.userId
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}



module.exports = {
    getAllTasks,
    getAllCompletedTasks,
    getAllIncompletedTasks,
}