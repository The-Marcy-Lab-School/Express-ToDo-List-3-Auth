const express = require('express');
const taskController = require('../controllers/todos');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/register', userController.register);

router.post('/register', userController.createUser);

router.get('/tasks/:user', taskController.getAllTasksByUserId);

router.post('/newTask/:user', taskController.createTask);

router.put('/updateTask/:user/:task', taskController.updateTask);

router.put('/isComplete/:user/:task', taskController.isCompleted);

router.delete('/deleteTask/:user/:task', taskController.deleteTask);

module.exports = router;
