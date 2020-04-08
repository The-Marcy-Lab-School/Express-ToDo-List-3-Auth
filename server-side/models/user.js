const db = require('../../db')


async function addUser(first_name, last_name, email, hashedPassword) {
  const queryText = `INSERT INTO users (first_name, last_name, email, hashed_password)
  VALUES ($1, $2, $3, $4);`
  return db.query(queryText, [first_name, last_name, email, hashedPassword])
}

async function getByEmail(req, res) {
  try{
    const {email} = req.params
    const queryText = 'SELECT * FROM users WHERE email=$1'
    const client = await db.connect()
    const result = await client.query(queryText, [email])
    const results = { 'results': (result) ? result.rows : null }
    client.release()
    res.send(results)

    
  }
  catch (err) {
    console.error(err)
    res.send(err)
  }
}



module.exports = {
  addUser,
  getByEmail
}