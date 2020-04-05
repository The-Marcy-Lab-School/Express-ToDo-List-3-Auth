const db = require('../db');

class User {
  static createUser(name, email, password) {
    const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);';
    return db.query(queryText, [name, email, password]);
  }

  static getUserById(userId) {
    const queryText = 'SELECT * FROM users WHERE id = $1;';
    return db.query(queryText, [userId]);
  }
}

module.exports = User;
