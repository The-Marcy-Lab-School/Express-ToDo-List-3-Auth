const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signUp = require('./routes/signUp');
const logIn = require('./routes/logIn');
const tasks = require('./routes/tasks');
const authenticate = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use(signUp);
app.use(logIn);

app.use(authenticate);

app.use(tasks);

app.listen(port, () => console.log(`Listening on port ${port}...`));
