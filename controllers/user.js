const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/User');

const authorize = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const encrypted = await User.encrypt(password);
    await User.add(email, encrypted, username);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// This function is responsible for decoding the cookie and authenticating the user
const authenticate = async (req, res, next) => {
  if (!req.cookies.userToken) {
    res.status(401).send('Unauthorized Users');
    return res.redirect('/login');
  }

  const payload = jwt.verify(req.cookies.userToken, 'secret');
  console.log('Payload:', payload);
  const { email, password } = payload;
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).send('Unauthorized User');
    }

    if (password === user.password) {
      return next();
    }
    return res.status(401).send('Unauthorized User');
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

// This function validate login and set the cookie for a user
const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).send('Unauthorized user');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      return jwt.sign({
        email, password: user.password, userId: user.id, iat: Math.floor(Date.now() / 1000) + (60 * 60),
      }, 'secret', (err, encryptedPayload) => {
        if (err) {
          res.status(403).send('Error');
        }
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.status(200);
        res.redirect('/showTask');
      });
    }
    return res.status(403).send('Wrong Password');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

// This function is responsible for decoding the cookie and returning user tasks
const getUserTasks = (req, res) => {
  const payload = jwt.verify(req.cookies.userToken, 'secret');
  console.log('payload at line 80:', payload);
  const { userId } = payload;

  User.getUserTasks(userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send('500 Internal Server Error');
    });
};

const showTaskForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'addTask.html'));
};

const showTasks = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'tasks.html'));
};

const register = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
};

const login = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
};

const updateTaskForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'updateTask.html'));
};

// const logout = (req,res) =>{
//   res.clearCookie('userToken');
// };

module.exports = {
  authorize,
  authenticate,
  getUserTasks,
  login,
  register,
  verifyLogin,
  showTaskForm,
  showTasks,
  updateTaskForm,
};
