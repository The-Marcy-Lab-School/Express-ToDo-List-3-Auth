const express = require('express');
const taskController = require('../controllers/todos');
const router = express.Router();

router.get('/home', taskController.getAllTasksByUserEmail);

router.get('/newTask', taskController.getCreateTask);

router.post('/newTask', taskController.createTask);

router.put('/updateTask/:task', taskController.updateTask);

router.put('/isComplete/:task', taskController.isCompleted);

router.delete('/deleteTask/:task', taskController.deleteTask);

module.exports = router;
