const db = require('../db');

class User {
  static createUser(name, email, password) {
    const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);';
    return db.query(queryText, [name, email, password]);
  }

  static getUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }

  static getLastCreatedUser() {
    const queryText = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }
}

module.exports = User;
