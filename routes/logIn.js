const express = require('express');
const logInController = require('../controllers/logIn');

const router = express.Router();

router.get('/login', logInController.viewPage);
router.post('/login', logInController.attemptLogIn);
router.get('/logout', logInController.logout);

module.exports = router;
