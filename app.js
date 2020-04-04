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



app.post('/register', userController.authorize);



app.listen(port, ()=> console.log(`Server listening on port ${port}...`));