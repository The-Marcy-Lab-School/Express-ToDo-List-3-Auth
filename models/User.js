const db = require('../db');

class User {
  static find(email) {
    const querytext = 'SELECT * FROM users WHERE email = $1';
    return db.query(querytext, [email]);
  }

  static create(firstName, lastName = null, email, hashedPassword) {
    const querytext = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
    return db.query(querytext, [firstName, lastName, email, hashedPassword]);
  }
}

module.exports = User;
