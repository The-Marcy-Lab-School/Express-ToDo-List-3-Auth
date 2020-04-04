const db = require('../db');
const bcrypt = require('bcrypt');

class User {
  static add(email,password){
    const queryText = `INSERT INTO users (email, password)
    VALUES ($1, $2);`;
    return db.query(queryText, [email,password]);
  }
  
  static getByEmail(email){
    const queryText = 'SELECT * FROM users WHERE email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }
  
  static async encrypt(password){
    const saltRounds = 8;
    const hashedPassword =  await bcrypt.hash(password,saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  }
 static async checkUser(email,password){
   const user = this.getByEmail(email);
   const match = await bcrypt.compare(password, user.password);
   return match;
 }
}

module.exports = User;