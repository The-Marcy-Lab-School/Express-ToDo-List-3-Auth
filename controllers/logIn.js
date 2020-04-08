const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const viewPage = (req, res) => {
  res.render('logInForm');
};

const logout = (req, res) => res
  .cookie('todo_api_app_token', '', { httpOnly: true })
  .status(200)
  .render('logout');

// Making a difference between email and password errors because of scope of application
// With more time (and if it was a priority) I would give less hints about what's wrong
// With less hints, another way to verify an unsuccessful login would be great!
const attemptLogIn = async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.find(email);
  } catch (err) {
    return res.status(500).json({ error: '500 User does not exist' });
  }
  [user] = user.rows;

  // abstract verifying email and password
  try {
    const isPasswordAMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordAMatch) {
      return res
        .status(403)
        .cookie('todo_api_app_token', '', { httpOnly: true })
        .json({ error: '403 Forbidden' });
    }
  } catch (err) {
    return res.status(503).json({ error: '503 Failed to authenticate' });
  }

  const privateKey = 'secret'; // hardcoded because educational purposes
  const expirationTime = '2d'; // readable, can be math expression for seconds
  const signOpts = { expiresIn: expirationTime };
  return jwt.sign({ email, password }, privateKey, signOpts, (err, token) => {
    if (err) {
      throw new Error();
    }
    res
      .cookie('todo_api_app_token', token, { httpOnly: true })
      .status(200)
      .json({ success: 'Authorized' });
  });
};

module.exports = {
  viewPage,
  attemptLogIn,
  logout,
};
