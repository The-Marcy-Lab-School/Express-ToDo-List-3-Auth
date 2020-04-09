const db = require('../db');

class Task {
  static createTask(
    taskName,
    taskDescription,
    dateCreated,
    dueDate,
    isComplete,
  ) {
    const queryText = 'INSERT INTO task (task_name, task_description, date_created, due_date, is_complete) VALUES($1,$2,$3,$4,$5)';
    return db.query(queryText, [
      taskName,
      taskDescription,
      dateCreated,
      dueDate,
      isComplete,
    ]);
  }

  static getAllTasks() {
    return db.query('SELECT * FROM task;');
  }

  static getLastCreated() {
    const queryText = 'SELECT * FROM task ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }

  static getTaskById(id) {
    const queryText = 'SELECT * FROM task WHERE id = $1;';
    return db.query(queryText, [id]);
  }

  static completeTask(id) {
    const queryText = 'UPDATE task SET is_complete = true WHERE id = $1;';
    return db.query(queryText, [id]);
  }

  static deleteTask(id) {
    const queryText = 'DELETE FROM task WHERE id = $1';
    return db.query(queryText, [id]);
  }
}

module.exports = Task;
