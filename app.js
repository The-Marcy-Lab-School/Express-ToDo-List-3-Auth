const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const todoRoute = require('./routes/taskRoute');
const userController = require('./controllers/users');
const path = require('path');


const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

app.get('/userRegister', userController.getRegisterPage);

app.get('/userLogin', userController.getLoginPage);

app.post('/userRegister', userController.createUser);

app.post('/userLogin', userController.verifyUser);

app.get('/logout', userController.logout);

app.use(userController.authenticate);

app.get('/home', userController.loadHomePage);

app.use(todoRoute);


app.listen(port, () => console.log(`Listening on port ${port}.`));
