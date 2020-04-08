const bcrypt = require('bcrypt');
const db = require('../db');

class User {
  static add(email, password, username) {
    const queryText = `INSERT INTO users (email, password,username)
    VALUES ($1, $2,$3);`;
    return db.query(queryText, [email, password, username]);
  }

  static getByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }

  static async encrypt(password) {
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static getUserTasks(userId) {
    const queryText = `SELECT tasks.task_name, tasks.task_description, tasks.due_date , tasks.is_complete                                            
                      FROM tasks WHERE user_id = $1;`;
    return db.query(queryText, [userId])
      .then((data) => data.rows);
  }
}

module.exports = User;
