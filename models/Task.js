const db = require('../db');
/*
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name character varying(64)
    NOT NULL CONSTRAINT no_empty_task_name CHECK(task_name != ''),
    task_description text,
    is_complete boolean DEFAULT FALSE,
    due_date DATE,
    user_id integer REFERENCES users,
    date_created timestamptz DEFAULT NOW()
);
 */
class Task {
  static getAll(userId) {
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1';
    return db.query(queryText, [userId]);
  }

  static find(userId, taskId) {
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1 AND task_id = $2';
    db.query(queryText, [userId, taskId])
      .then((res) => res.rows[0])
      .catch((err) => {
        console.log(err);
      });
  }

  static create(userId, task, description, isComplete = false, dueDate = null) {
    const queryText = 'INSERT INTO tasks (task_name, task_description, is_complete, due_date, user_id) VALUES ($2, $3, $4, $5, $1)';
    return db.query(queryText, [
      userId,
      task,
      description,
      isComplete,
      dueDate,
    ]);
  }

  static getLast(userId) {
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY task_id DESC LIMIT 1';
    db.query(queryText, [userId])
      .then((res) => res.rows[0])
      .catch((err) => {
        console.log(err);
      });
  }

  static toggleComplete(taskId) {
    const queryText = `UPDATE tasks
    SET is_complete = NOT is_complete
    WHERE task_id = $1`;
    return db.query(queryText, [taskId]);
  }

  static deleteTask(taskId) {
    const queryText = 'DELETE FROM tasks WHERE task_id = $1';
    return db.query(queryText, [taskId]);
  }
}

module.exports = Task;
