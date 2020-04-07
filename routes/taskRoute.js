const express = require('express');
const taskController = require('../controllers/todos');
const router = express.Router();

router.get('/tasks', taskController.getTasks);

router.get('/newTask', taskController.getCreateTask);

router.get('/updateTask', taskController.getUpdateTask);

router.post('/newTask', taskController.createTask);

router.put('/updateTask/:task', taskController.updateTask);

router.put('/isComplete/:task', taskController.isCompleted);

router.delete('/deleteTask/:task', taskController.deleteTask);

module.exports = router;
