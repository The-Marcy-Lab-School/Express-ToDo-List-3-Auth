const Todo = require('../models/Todo');
const userController = require('../controllers/users');

const createTask = (req, res) => {
  const { user } = req.params;
  const { name, description, dueDate } = req.body;
  Todo.createTask(user, name, description, dueDate)
    .then(() => Todo.getLastCreated())
    .then((data) => res.status(201).json(data.rows))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Could not create task. Please try again.' }));
};

const getAllTasksByUserId = async(req, res) => {
  const { user } = req.params;
  try {
    await userController.verifyUser;
    const data = await Todo.getAllTasksByUserId(user);
    return data.json(data.rows);
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

module.exports = {
  createTask,
  getAllTasksByUserId,
  updateTask,
  deleteTask,
  isCompleted,
};
