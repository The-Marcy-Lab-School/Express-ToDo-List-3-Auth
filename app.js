const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const todoRoute = require('./routes/taskRoute');
const userController = require('./controllers/users');


const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Helloooo');
});

//Routes for user controllers - signing in, registering

app.post('/register', userController.createUser);

app.post('/login', userController.verifyUser);

app.use(userController.authenticate);

//Routes for loading views
app.get('/userRegister', userController.getRegisterPage);

app.get('/userLogin', userController.getLoginPage);

app.get('/home', userController.loadHomePage);


app.use(todoRoute);


app.listen(port, () => console.log(`Listening on port ${port}.`));
