const express = require('express')
const listController = require('../controllers/to-do-query')
const userController = require('../controllers/user-controller')
const toDoList = require('../models/to-do-list')
const router = express.Router()
const pool = require('../../db')
const authenticate = require('../auth/verify') 

router.get('/', listController.greetUser)
router.get('/login', userController.login)
router.post('/register', userController.register)
router.get('/incomplete-tasks', authenticate, listController.getAllIncompletedTasks)
router.get('/completed-tasks', authenticate, listController.getAllCompletedTasks)
router.get('/tasks', authenticate, listController.getAllTasks)
router.post('/add-task', authenticate, toDoList.addTask)
router.delete('/delete-task/:id', authenticate, toDoList.deleteTask)
router.put('/update-task/:id', authenticate, toDoList.updateTask)
router.put('/complete-task/:id', authenticate, toDoList.completeTask)




module.exports = router