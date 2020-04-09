const express = require('express');
const taskController = require('../controllers/todo');

const router = express.Router();


router.post('/tasks', taskController.addTask);

router.get('/addTask', taskController.getAddTask);

router.get('/tasks', taskController.getAllTasks);

router.get('/tasks/:id', taskController.getTaskById);

// router.put('/tasks/:id', taskController.completeTask);

router.delete('/tasks/:id', taskController.deleteTask);

router.get('/createTask', taskController.getAddTask);

router.get('/updateTask', taskController.getUpdateTask);


module.exports = router;
