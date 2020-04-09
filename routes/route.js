const express = require('express');
const taskController = require('../controllers/todo');

const router = express.Router();


router.post('/tasks', taskController.createTask);

router.get('/addTask', taskController.getAddTask);

router.get('/tasks', taskController.getAllTasks);

router.get('/tasks/:id', taskController.getTaskById);

router.put('/tasks/:id', taskController.completeTask);

router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
