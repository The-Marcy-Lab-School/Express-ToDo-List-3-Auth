const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = async(req,res) => {
  const { email, password,username } = req.body;
  
  const encrypted = await User.encrypt(password);
  console.log(encrypted);
  User.add(email,encrypted,username)
    .then((data)=> res.status(201).send('User created'))
    .catch((err)=>{
      console.log(err);
      res.send(err);
    });
};
//left off here
const authenticate = async (req,res,next) =>{
  const {email,password} = req.body;
  try{
    const user = await User.checkUser(email,password);
    if(!user){
      return res.status(401).send('Unauthorized User');
    }
    
    if(user){
      return next();
    }
    
  } catch(err){
    console.log(err);
    return res.send(err);
  }
};

module.exports = {
  authorize,
  authenticate,
};