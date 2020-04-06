const Todo = require('../models/Todo');
const userController = require('../controllers/users');
const jwt = require('jsonwebtoken');

const createTask = async(req, res) => {
  try {
    const { userEmail, name, description, dueDate } = req.body;
    await Todo.createTask(userEmail, name, description, dueDate);
    const data = await Todo.getLastCreated();
    return res.status(201).json(data.rows);
  }
  catch (err) {
    res.status(500).json({ error: 'Internal Server Error: Could not create task. Please try again.' });
  }
};

const getAllTasksByUserEmail = async(req, res) => {
  try {
    const data = await Todo.getLastCreatedUser();
    const result = await Todo.getAllTasksByUserEmail(data.rows[0].id);
    if (!result) {
      res.send('Task list is empty. Add a new task.');
    }
    console.log(res.json(result.rows));
    return result.json(result.rows);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error: Could not get all tasks from the user.' });
  }
};

const updateTask = (req, res) => {
  const { user, task } = req.params;
  const { name, description, dueDate } = req.body;
  Todo.updateTask(task, user, name, description, dueDate)
    .then(() => res.status(200).json({ message: 'Task successfully updated.' }))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be updated.' }));
};

const deleteTask = (req, res) => {
  const { task, user } = req.params;
  Todo.deleteTask(task, user)
    .then(() => res.status(204).json({ message: 'Task successfully deleted.' }))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be deleted.' }));
};

const isCompleted = (req, res) => {
  const { task, user } = req.params;
  const { completed } = req.body;
  Todo.isCompleted(task, user, completed)
    .then((data) => res.json(data.rows[0]))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Could not set task as completed.' }));
};

const getCreateTask = (req, res) => {
  res.render('createTask');
};

module.exports = {
  createTask,
  getAllTasksByUserEmail,
  updateTask,
  deleteTask,
  isCompleted,
  getCreateTask,
};
