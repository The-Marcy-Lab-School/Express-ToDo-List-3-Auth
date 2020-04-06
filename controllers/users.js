const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 8;
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      console.log('Hashed Password: ', hashedPassword);
      User.createUser(name, email, hashedPassword);
      jwt.sign({ name, email, password }, 'secret', (err, encryptedPayload) => {
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.status(201).json(`Token: ${encryptedPayload}`);
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const verifyUser = async(req, res, next) => {
  if (!req.cookies.userToken) {
    return res.status(401).send('Please sign in first or register.');
  }
  const payload = jwt.verify(req.cookies.userToken, 'Do Not Open');
  const { userId, password } = payload;

  try {
    const user = await User.getUserById(userId);

    if (!user) {
      return res.status(403).send('User does not exist. Please register or try again.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return next();
    }

    return res.status(403).send('Password is incorrect. Please try again.');
  }
  catch (err) {
    console.log(err);
    return res.send(err);
  }
};

module.exports = {
  createUser,
  verifyUser,
};
