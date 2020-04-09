const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const todoRouter = require('./routes/route');
const adminController = require('./controllers/admin');

const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

app.get('/todo', adminController.getToDoList);

app.post('/signup', adminController.signUp);

app.get('/signup', adminController.getSignUpPage);

app.post('/login', adminController.login);

app.get('/login', adminController.getLoginPage);

app.get('/logout', adminController.logout);

app.use(adminController.verify);

app.use(todoRouter);

app.listen(port, () => console.log(`Now listening on port ${port}...`));
