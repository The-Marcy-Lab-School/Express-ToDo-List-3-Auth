const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.cookies.todo_api_app_token;

  if (token) {
    const privateKey = 'secret';
    const payload = jwt.verify(token, privateKey);
    const { email, password } = payload;
    try {
      const queryRes = await User.find(email);
      const [user] = queryRes.rows;
      const isVerified = await bcrypt.compare(password, user.password);
      if (isVerified) {
        return next();
      }
    } catch (err) {
      return res.status(500).json({ error: 'Failed to authenticate' });
    }
  }
  return res.status(403).json({ error: 'Unauthorized!' });
};

module.exports = authenticate;
