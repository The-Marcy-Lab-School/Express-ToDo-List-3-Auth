const express = require('express');
const tasksController = require('../controllers/tasks');

const router = express.Router();

router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:taskId', tasksController.getTaskById);
router.post('/tasks', tasksController.addTask);
router.put('/tasks/:taskId', tasksController.toggleTaskComplete);
router.delete('/tasks/:taskId', tasksController.deleteTask);

module.exports = router;
