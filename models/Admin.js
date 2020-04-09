const db = require('../db');

class Admin {
  static add(email, password, username) {
    const queryText = `INSERT INTO admins (email, password, username)
    VALUES ($1, $2, $3);`;
    return db.query(queryText, [email, password, username]);
  }

  static getByEmail(email) {
    const queryText = 'SELECT * FROM admins WHERE email=$1';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }
}

module.exports = Admin;
