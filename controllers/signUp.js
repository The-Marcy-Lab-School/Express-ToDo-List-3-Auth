const bcrypt = require('bcrypt');
const User = require('../models/User');

const viewPage = (req, res) => {
  res.render('signUpForm');
};

const encryptPassword = async (plainTextPassword) => {
  const saltRounds = 8;
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  return hash;
};

// While creating user may fail for a number of reasons, for simplicity instead
// of checking if email is already used I will just attempt the creation and
// consider an error as originitating from the UNIQUE constraint of the email
// colum. Hint user of possible sources of error!
const attemptSignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hash = await encryptPassword(password);

  try {
    await User.create(firstName, lastName, email, hash);
  } catch (err) {
    return res.status(500).json({ error: '500 Resource not created.' });
  }

  return res.status(201).json({ success: '201 Resource created.' });
};

module.exports = {
  viewPage,
  attemptSignUp,
};
