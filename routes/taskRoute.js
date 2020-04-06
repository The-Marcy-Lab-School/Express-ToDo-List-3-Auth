const express = require('express');
const taskController = require('../controllers/todos');
const router = express.Router();

router.get('/home', taskController.getAllTasksByUserId);

router.post('/newTask/:user', taskController.createTask);

router.put('/updateTask/:user/:task', taskController.updateTask);

router.put('/isComplete/:user/:task', taskController.isCompleted);

router.delete('/deleteTask/:user/:task', taskController.deleteTask);

module.exports = router;
