const db = require('../db');

class Todo {
  static createTask(userEmail, name, description, dueDate) {
    const queryText = 'INSERT INTO tasks (name, description, due_date) VALUES ($1, $2, $3) WHERE user_email = $4;';
    return db.query(queryText, [name, description, dueDate, userEmail]);
  }

  static getAllTasksByUserEmail(userEmail) {
    const queryText = 'SELECT * FROM tasks WHERE user_email = $1;';
    return db.query(queryText, [userEmail]);
  }

  static getLastCreated() {
    const queryText = 'SELECT * FROM tasks ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static getLastCreatedUser() {
    const queryText = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static updateTask(taskId, userEmail, name, description, dueDate) {
    const queryText = 'UPDATE tasks SET name = $3, description = $4, due_date = $5 WHERE id = $1 AND user_email = $2;';
    return db.query(queryText, [taskId, userEmail, name, description, dueDate]);
  }

  static deleteTask(taskId, userEmail) {
    const queryText = 'DELETE FROM tasks WHERE id = $1 AND user_email = $2;';
    return db.query(queryText, [taskId, userEmail]);
  }

  static isCompleted(taskId, userEmail, completed) {
    if (completed === 't') {
      const queryText = 'UPDATE tasks SET completed = false WHERE id = $1 AND user_email = $2;';
      return db.query(queryText, [taskId, userEmail]);
    }
    const queryText = 'UPDATE tasks SET completed = true WHERE id = $1 AND user_email = $2;';
    return db.query(queryText, [taskId, userEmail]);
  }
}

module.exports = Todo;
