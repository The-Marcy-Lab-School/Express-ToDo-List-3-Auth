const express = require('express');
const signUpController = require('../controllers/signUp');

const router = express.Router();

router.get('/signup', signUpController.viewPage);
router.post('/signup', signUpController.attemptSignUp);

module.exports = router;
