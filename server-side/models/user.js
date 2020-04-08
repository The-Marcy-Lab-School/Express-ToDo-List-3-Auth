const db = require('../../db')


async function addUser(first_name, last_name, email, hashedPassword) {
  const queryText = `INSERT INTO users (first_name, last_name, email, hashed_password)
  VALUES ($1, $2, $3, $4);`
  return db.query(queryText, [first_name, last_name, email, hashedPassword])
}

async function getByEmail(email) {
  const queryText = 'SELECT * FROM users WHERE email=$1'
  return db.query(queryText, [email])
}


module.exports = {
  addUser,
  getByEmail
}