const Todo = require('../models/Todo');
const userController = require('../controllers/users');
const jwt = require('jsonwebtoken');
const path = require('path');

const createTask = async(req, res) => {
  try {
    const { userId, name, description, dueDate } = req.body;
    console.log(userId);
    await Todo.createTask(userId, name, description, dueDate);
    const data = await Todo.getLastCreated();
    console.log(data);
    return res.status(201).json(data.rows);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error: Could not create task. Please try again.' });
  }
};

const getTasks = async(req, res) => {
  try {
    const { userId } = req.body;
    const result = await Todo.getTasksByUserId(userId);
    if (result.length === 0) {
      res.json({ message: 'Task list is empty. Add a new task.' });
    }
    console.log(res.json(result));
    return res.json(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error: Could not get all tasks from the user.' });
  }
};

const updateTask = (req, res) => {
  const { task } = req.params;
  const { userId, name, description, dueDate } = req.body;
  Todo.updateTask(task, userId, name, description, dueDate)
    .then(() => res.status(200).json({ message: 'Task successfully updated.' }))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be updated.' }));
};

const deleteTask = (req, res) => {
  const { task } = req.params;
  const { userId } = req.body;
  Todo.deleteTask(task, userId)
    .then(() => res.status(204).json({ message: 'Task successfully deleted.' }))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be deleted.' }));
};

const isCompleted = (req, res) => {
  const { task } = req.params;
  const { userId, completed } = req.body;
  Todo.isCompleted(task, userId, completed)
    .then((data) => res.json(data.rows[0]))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Could not set task as completed.' }));
};

const getCreateTask = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'createTask.html'));
};

const getUpdateTask = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'updateTask.html'));
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  isCompleted,
  getCreateTask,
  getUpdateTask,
};
