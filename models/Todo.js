const db = require('../db');

class Todo {
  static createTask(userId, name, description, dueDate) {
    const queryText = 'INSERT INTO tasks (user_id, name, description, due_date) VALUES ($1, $2, $3, $4);';
    return db.query(queryText, [userId, name, description, dueDate]);
  }

  static getAllTasksByUserId(userId) {
    const queryText = 'SELECT * FROM tasks WHERE user_id = $1;';
    return db.query(queryText, [userId]);
  }

  static getLastCreated() {
    const queryText = 'SELECT * FROM tasks ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static updateTask(taskId, userId, name, description, dueDate) {
    const queryText = 'UPDATE tasks SET name = $3, description = $4, due_date = $5 WHERE id = $1 AND user_id = $2;';
    return db.query(queryText, [taskId, userId, name, description, dueDate]);
  }

  static deleteTask(taskId, userId) {
    const queryText = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2;';
    return db.query(queryText, [taskId, userId]);
  }

  static isCompleted(taskId, userId, completed) {
    if (completed === 't') {
      const queryText = 'UPDATE tasks SET completed = false WHERE id = $1 AND user_id = $2;';
      return db.query(queryText, [taskId, userId]);
    }
    const queryText = 'UPDATE tasks SET completed = true WHERE id = $1 AND user_id = $2;';
    return db.query(queryText, [taskId, userId]);
  }
}

module.exports = Todo;
