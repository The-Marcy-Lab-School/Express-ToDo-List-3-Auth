const pool = require('../../db')

async function addTask(req, res) {
  try {
    const user_id = req.userId
    const {name, description} = req.body
    const queryText = 'INSERT INTO tasks (user_id, name, description) VALUES ($1, $2, $3);'  
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id, name, description]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}

async function deleteTask(req, res) {
  try {
    const user_id = req.userId
    const {id} = req.params
    const queryText = 'DELETE FROM tasks WHERE task_id = $1 AND user_id = $2'  
    const client = await pool.connect();
    const result = await client.query(queryText, [id, user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.status(201).json({ message: 'Task deleted.' });
    client.release();
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: '500: Internal Server Error. Resource not deleted.' });
  }
}

async function updateTask(req, res) {
  try {
    const user_id = req.userId
    const {id} = req.params
    const {name, description} = req.body
    const dateAdded = new Date()
    const queryText = 'UPDATE tasks SET (name, description, date_added) = ($2, $3, $4) WHERE task_id = $1 AND user_id = $5;'
    const client = await pool.connect();
    const result = await client.query(queryText, [id, name, description, dateAdded, user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.status(201).json({ message: 'Task updated.' });
    client.release();
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: '500: Internal Server Error. Resource not updated.' });
  }
}

async function completeTask(req, res) {
  try {
    const user_id = req.userId
    const {id} = req.params
    const dateCompleted = new Date()
    const queryText = 'UPDATE tasks SET (is_complete, date_complete) = ($2, $3) WHERE task_id = $1 AND user_id = $4;'
    const client = await pool.connect();
    const result = await client.query(queryText, [id, true, dateCompleted, user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    res.status(201).json({ message: 'Task completed.' });
    client.release();
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: '500: Internal Server Error. Resource not completed.' });
  }
}
        

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    completeTask,
}