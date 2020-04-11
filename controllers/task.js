const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// usersTasks
const getAllTasks = (req, res) => {
  const { userToken } = req.cookies;
  const payload= jwt.decode(userToken);
  const { id } = payload;

  Task.getTasks(id)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

// createTask
const createTask = (req, res) => {
  const { userToken } = req.cookies;
  const payload= jwt.decode(userToken);
  const { id } = payload;
  const { dateDue, title, description } = req.body;

  Task.createTask(id, dateDue, title, description)
    .then(() => Task.getLastCreated())
    .then((user) => res.status(201).json(user.rows[0]))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
    
  res.redirect('/tasks');
};


// tasks/taskId
const updateTask = (req, res) => {
  const { userToken } = req.cookies;
  const payload= jwt.decode(userToken);
  const { id } = payload;
  const { taskId, completed } = req.params;

  Task.updateTask(taskId, id, completed)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

// tasks/taskId
const deleteTask = (req, res) => {
  const { userToken } = req.cookies;
  const payload= jwt.decode(userToken);
  const { id } = payload;
  const { taskId } = req.params;

  Task.deleteTask(taskId, id)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
