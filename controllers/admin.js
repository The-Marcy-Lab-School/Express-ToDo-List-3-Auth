const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const Admin = require('../models/Admin');

const signUp = (req, res) => {
  const { email, password, username } = req.body;

  const saltRounds = 8;
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      console.log('Hashed Password: ', hashedPassword);
      Admin.add(email, hashedPassword, username);
    })
    .then(() => res.status(201).send('Admin account created.'))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.getByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);

    req.body.userEmail = user.email;
    req.body.userPassword = user.password;
    req.body.userId = user.id;
    req.body.username = user.username;

    if (!user) {
      return res.status(403).send('Email does not exsist.');
    }
    if (validPassword) {
      const privateKey = 'superdupersecret';

      return jwt.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.username,
        },
        privateKey,
        (err, payload) => {
          res.cookie('userToken', payload, { httpOnly: true });
          res.redirect('/tasks');
        },
      );
    }
    return res.status(403).send('Email or password is incorrect.');
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const verify = async (req, res, next) => {
  if (!req.cookies.userToken) {
    return res.status(401).send('Unauthorized User.');
  }
  const payload = jwt.verify(req.cookies.userToken, 'superdupersecret');
  const { email, password } = payload;
  try {
    const user = await Admin.getUserByEmail(email);

    req.body.userId = user.id;

    if (!user) {
      return res.status(403).send('Unauthorized User: User does not exist.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return next();
    }

    return res.status(403).send('Unauthorized User: Try logging in again.');
  } catch (err) {
    return res.send(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/login');
};

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

const getSignUpPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'signUp.html'));
};

const getToDoList = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'todo.html'));
};


module.exports = {
  signUp,
  login,
  verify,
  logout,
  getLoginPage,
  getSignUpPage,
  getToDoList,
};
