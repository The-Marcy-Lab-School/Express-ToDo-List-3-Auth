const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const path = require('path')
const fetch = require('node-fetch')
const pool = require('../../db')


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
      res.sendFile(path.join(__dirname ,'../../public/views' , 'to-do-list.html'))
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
}

async function login(req, res){
  try {
    const {email, password} = req.body
    const queryText = 'SELECT * FROM users WHERE email = $1'
    const client = await pool.connect()
    const result = await client.query(queryText, [email])
    const results = { 'userArr': (result) ? result.rows : null }
    const user = results.userArr[0]
    
    if (!user.email) {
      return res.status(401).send('Invalid Email')
    }
    
    const isValidPassword = await bcrypt.compare(password, user.hashed_password)
    
    if (isValidPassword) {
      const token = jwt.sign({ email: email, password: user.hashedPassword }, 'secret')
      res.cookie('token', token)
      res.sendFile(path.join(__dirname ,'../../public/views' , 'to-do-list.html'))
    }
  }
  catch (err) {
    console.error(err)
    res.send('err')
  }
  
}

const logout = (req, res) => {
   res.clearCookie('token')
   res.sendFile(path.join(__dirname ,'../../public/views' , 'index.html'))
}


module.exports = {
  register,
  login,
  logout
}