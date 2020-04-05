const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/register', userController.register);

router.get('/login', userController.login);

router.post('/register', userController.createUser);

router.use(userController.verifyUser);

router.get('/home/:user', userController.getUserList);

module.exports = router;
