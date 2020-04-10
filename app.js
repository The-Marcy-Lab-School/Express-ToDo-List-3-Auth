const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const path = require('path');
const userController = require('./controllers/user');
const tasksController = require('./controllers/task');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// render home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// render sign up page
app.get('/signUp', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/sign-up.html'));
});
app.post('/signUp', userController.signUp);

// render the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'));
});
app.post('/login', userController.login);

//logoutUser
app.get('/logout', userController.logout);

//verifies that the user is logged in
app.use(userController.authenticate);

// creating task 
app.get('/createTask', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/add.html'));
});
app.post('/createTask', tasksController.createTask);


app.put('/tasks/:taskId/:completed', tasksController.updateTask);

// render the tasks page for the user
app.get('/tasks', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/tasks.html'));
});
app.get('/userTasks', tasksController.getAllTasks);

//deleteTask
app.delete('/tasks/:taskId', tasksController.deleteTask);

app.listen(port, () => console.log(`Now listening on port ${port}`));
