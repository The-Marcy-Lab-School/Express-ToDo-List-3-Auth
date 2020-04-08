const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const path = require('path')
const fetch = require('node-fetch')


const register = (req, res) => {
  const {first_name, last_name, email, password} = req.body
  const saltRounds = 10
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      User.addUser(first_name, last_name, email, hashedPassword)
      const token = jwt.sign({ email: email, password: hashedPassword }, 'secret')
      return token
    })
    .then((token) => {
      res.cookie('token', token)
      res.status(200).send(`Cookie set with token: ${token}`)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
}

const login = (req, res) => {
  const {email, password} = req.body
  const user = User.getByEmail(email)
  
  if (!user) {
     return res.status(401).send('Invalid Email')
  }
  
  const isValidPassword = bcrypt.compare(password, user.hashed_password)
  
  if (isValidPassword) {
    const token = jwt.sign({ email: email, password: user.hashedPassword }, 'secret')
    res.cookie('token', token)
    res.sendFile(path.join(__dirname ,'../../public/views' , 'to-do-list.html'))
  }
  
  return res.status(403).send('Invalid Email/Password')
  
}

// const login = async (req, res) => {
  
//   const {email, password} = req.body
//   const user = await User.getByEmail(email)
  
//   if (!user) {
//     return res.status(401).send('Invalid Email')
//   }
//   const isValidPassword = await bcrypt.compare(password, user.hashed_password)
  
//   if (isValidPassword) {
//     const token = jwt.sign({ email: email, password: user.hashedPassword }, 'secret')
//     res.cookie('token', token)
//     res.sendFile(path.join(__dirname ,'../../public/views' , 'to-do-list.html'))
//   }
//   return res.status(403).send('Invalid Email/Password')
// }

const logout = (req, res) => {
   res.clearCookie('token')
   res.sendFile(path.join(__dirname ,'../../public/views' , 'index.html'))
}


module.exports = {
  register,
  login,
  logout
}