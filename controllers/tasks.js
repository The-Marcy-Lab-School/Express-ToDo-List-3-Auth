const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const User = require('../models/User');

const getUserIdFromToken = async (token) => {
  const privateKey = 'secret';
  const payload = jwt.verify(token, privateKey);
  const { email } = payload;
  try {
    const queryRes = await User.find(email);
    const [user] = queryRes.rows;
    return user.user_id;
  } catch (err) {
    throw new Error();
  }
};

const getAllTasks = async (req, res) => {
  const { todo_api_app_token } = req.cookies;
  const userId = await getUserIdFromToken(todo_api_app_token);
  let queryRes;
  let tasks;
  try {
    queryRes = await Task.getAll(userId);
    tasks = queryRes.rows;
  } catch (err) {
    res.status(500).json({ error: '500 Internal Server Error' });
  }
  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  const { todo_api_app_token } = req.cookies;
  const userId = await getUserIdFromToken(todo_api_app_token);
  const {
    task, description, isComplete, dueDate,
  } = req.body;
  await Task.create(userId, task, description, isComplete, dueDate);
  const lastCreatedTask = await Task.getLast(userId);
  res.status(200).json(lastCreatedTask);
};

const getTaskById = async (req, res) => {
  const { todo_api_app_token } = req.cookies;
  const userId = await getUserIdFromToken(todo_api_app_token);
  const { taskId } = req.params;
  const task = await Task.find(userId, taskId);
  res.status(200).json(task);
};

const toggleTaskComplete = async (req, res) => {
  // const { todo_api_app_token } = req.cookies;
  // const userId = await getUserIdFromToken(todo_api_app_token);
  const { taskId } = req.params;
  Task.toggleComplete(taskId)
    .then(() => {
      res.status(200).json({ success: '200 Resource updated' });
    })
    .catch((err) => {
      res.status(500).json({ error: '500 Could not update resource' });
    });
};

const deleteTask = async (req, res) => {
  // const { todo_api_app_token } = req.cookies;
  // const userId = await getUserIdFromToken(todo_api_app_token);
  const { taskId } = req.params;
  Task.deleteTask(taskId)
    .then(() => {
      res.status(200).json({ success: '200 Resource deleted' });
    })
    .catch((err) => {
      res.status(500).json({ error: '500 Could not delete resource' });
    });
};

module.exports = {
  getAllTasks,
  addTask,
  getTaskById,
  toggleTaskComplete,
  deleteTask,
};
