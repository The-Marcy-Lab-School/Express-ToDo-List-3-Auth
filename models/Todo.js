const db = require('../db');

class Todo {
  static createTask(userId, name, description, dueDate) {
    const queryText = 'INSERT INTO tasks (user_id, name, description, due_date) VALUES ($1, $2, $3, $4);';
    return db.query(queryText, [userId, name, description, dueDate]);
  }

  static getTasksByUserId(userId) {
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1;';
    return db.query(queryText, [userId])
      .then((data) => data.rows);
  }

  static getLastCreated() {
    const queryText = 'SELECT * FROM tasks ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static getLastCreatedUser() {
    const queryText = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static updateTask(taskId, name, description, dueDate) {
    const queryText = 'UPDATE tasks SET name = $2, description = $3, due_date = $4 WHERE id = $1;';
    return db.query(queryText, [taskId, name, description, dueDate])
      .then((data) => data.rows);
  }

  static deleteTask(taskId, userId) {
    const queryText = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2;';
    return db.query(queryText, [taskId, userId]);
  }

  static isCompleted(taskId) {
    const queryText = 'UPDATE tasks SET completed = NOT completed WHERE id = $1;';
    return db.query(queryText, [taskId]);
  }
}

module.exports = Todo;
