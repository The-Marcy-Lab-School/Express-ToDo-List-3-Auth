const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const authenticate = async (req, res, next) => {
  const token = req.cookies.token
  
  if (!token) return res.status(401).send('Unauthorized, please sign in.')
  
  const user = await jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    return decoded
  })
  
  const userInfo = await User.getByEmail(user.email)
  
  if (!userInfo) return res.status(404).send("No user found.")
  
  req.userId = userInfo.user_id
  next()
}

module.exports = authenticate