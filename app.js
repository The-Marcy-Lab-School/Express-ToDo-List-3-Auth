const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/user');
const taskController = require('./controllers/to-do');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/register', userController.register);

app.post('/register', userController.authorize);

app.get('/login', userController.login);

app.post('/login', userController.verifyLogin);

app.use(userController.authenticate);

// sends a static html file with "tasks value from database"
app.get('/showTask', userController.showTasks);

app.get('/tasks', taskController.getAll);

app.post('/tasks', taskController.createTask);

app.get('/tasks/:id', taskController.getTaskById);

// update tasks
app.post('/tasks/:id', taskController.updateTask);

app.delete('/tasks/:id', taskController.deleteTask);

// Marks a compelete only once
app.put('/markComplete/:id', taskController.markComplete);

// sends a static html file with table vaules
app.get('/addTask', userController.showTaskForm);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
