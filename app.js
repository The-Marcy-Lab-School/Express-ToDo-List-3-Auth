const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/user');
const taskController = require('./controllers/to-do');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// app.use(userController.authenticate);


app.set('view engine','ejs');

app.get('/register', (req,res)=>{
  res.render('register');
});

app.post('/register', userController.authorize);

app.get('/', (req,res)=>{
  res.render('index');
});

app.post('/',userController.authenticate);

app.get('/task', taskController.getAll);

app.get('/task/:id', taskController.getTaskById);

app.post('/task', taskController.createTask);

app.put('/task/:id', taskController.updateTask);

app.delete('/task/:id', taskController.deleteTask);





app.listen(port, ()=> console.log(`Server listening on port ${port}...`));