const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// signUp
const signUp = (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 8;

  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      console.log('Hashed Password: ', hashedPassword);
      User.createUser(email, hashedPassword);
    })
    .then(() => {
      res.status(201).redirect('/login');
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

// refactor login with cookies etc
// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(403).send('No User with that Email');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).send('Wrong Password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
    };

    const privateKey = 'secret';

    jwt.sign(payload, privateKey, (err, hashedPayload) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log('JWT: ', hashedPayload);
      res.cookie('userToken', hashedPayload).redirect('/tasks');
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// verfying
const authenticate = async (req, res, next) => {
  console.log('verifying user');
  console.log(req.cookies);

  const { userToken } = req.cookies;

  if (!userToken) {
    return res.status(401).redirect('/');
  }

  const user = jwt.verify(req.cookies.userToken, 'secret');

  const { email, password } = user;

  try {
    const userInfo = await User.getUserByEmail(email);

    if (!userInfo) {
      return res.status(403).send('No User with that Email');
    }

    if (password === userInfo.password) {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};


// logout
const logout = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/login');
};


module.exports = {
  signUp,
  login,
  authenticate,
  logout,
};
