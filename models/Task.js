const db = require('../db');

class Task {
  static createTask(
    taskName,
    taskDescription,
    dateCreated,
    dueDate,
    isComplete,
    userId,
  ) {
    const queryText = 'INSERT INTO task (task_name, task_description, date_created, due_date, is_complete, user_id) VALUES($1,$2,$3,$4,$5)';
    return db.query(queryText, [
      taskName,
      taskDescription,
      dateCreated,
      dueDate,
      false,
      userId,
    ]);
  }

  static getAllTasks(userId) {
    return db.query('SELECT * FROM task WHERE user_id = $1;', [userId]);
  }

  static getTaskById(userId, id) {
    const queryText = 'SELECT * FROM task WHERE user_id = $1 AND id = $2;';
    return db
      .query(queryText, [userId, id])
      .then((res) => res.rows[0])
      .catch((err) => {
        console.log(err);
      });
  }

  static getLastCreated(id) {
    const queryText = 'SELECT * FROM task ORDER BY id DESC LIMIT 1;';
    return db
      .query(queryText, [id])
      .then((res) => res.rows[0])
      .catch((err) => {
        console.log(err);
      });
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
