const jwt = require('jsonwebtoken');
const path = require('path');
const Task = require('../models/Task');
const Admin = require('../models/Admin');


const getUserId = async (token) => {
  const privateKey = 'superdupersecret';
  const payload = jwt.verify(token, privateKey);
  const { email } = payload;
  try {
    const user = await Admin.getByEmail(email);
    return user.id;
  } catch (err) {
    throw new Error();
  }
};

const getAllTasks = async (req, res) => {
  const { userToken } = req.cookies;
  const userId = await getUserId(userToken);
  let response;
  let tasks;
  try {
    response = await Task.getAllTasks(userId);
    tasks = response.rows;
  } catch (err) {
    res.status(500).json({ error: '500 Internal Server Error' });
  }
  res.status(200).json(tasks.rows);
};

const getTaskById = async (req, res) => {
  const { userToken } = req.cookies;
  const userId = await getUserId(userToken);
  const { taskId } = req.params;
  const task = await Task.find(userId, taskId);
  res.status(200).json(task);
};

const addTask = async (req, res) => {
  const { userToken } = req.cookies;
  const { taskTitle, taskDescription, dueDate } = req.body;
  const userId = await getUserId(userToken);

  await Task.create(taskTitle, taskDescription, dueDate, userId);
  const lastTask = await Task.getLastCreated(userId);
  res.status(200).json(lastTask);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  Task.deleteTask(id)
    .then(() => res.status(204).json({ message: 'Task successfully deleted.' }))
    .then(() => res.redirect('/todo'))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be deleted.' }));
};

const getAddTask = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'addTask.html'));
};

const getUpdateTask = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'updateTask.html'));
};


module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  deleteTask,
  getAddTask,
  getUpdateTask,
};
