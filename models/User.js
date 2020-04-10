const db = require('../db');

class User {
  static createUser(email, password) {
    const queryText = 'INSERT INTO users (email, password) VALUES ($1, $2);';
    return db.query(queryText, [email, password]);
  }

  static getUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE users.email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }
}

module.exports = User;
