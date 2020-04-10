const db = require('../db');

class Task {
  static getTasks(userId) {
    return db.query('SELECT * FROM tasks WHERE tasks.user_id = $1;', [userId]);
  }

  static createTask(userId, dateDue, title, description) {
    const queryText = 'INSERT INTO tasks (user_id, date_due, completed, title, description) VALUES ($1, $2, $3, $4, $5, $6);';
    return db.query(queryText, [userId, dateDue, false, title, description]);
  }

  static getLastCreated(userId) {
    return db.query('SELECT * FROM tasks WHERE tasks.user_id = $1 ORDER BY id DESC LIMIT 1;', [userId]);
  }

  static updateTask(taskId, userId, completed) {
    const queryText = 'UPDATE tasks SET completed = $1 WHERE (tasks.id = $2 AND tasks.user_id = $3);';

    return db.query(queryText, [completed, taskId, userId]);
  }

  static deleteTask(taskId, userId) {
    return db.query('DELETE FROM tasks WHERE (tasks.id = $1 AND tasks.user_id = $2);', [taskId, userId]);
  }
}

module.exports = Task;
