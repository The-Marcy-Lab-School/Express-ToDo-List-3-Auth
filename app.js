const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const todoRoute = require('./routes/taskRoute');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

});

app.use(todoRoute);


app.listen(port, () => console.log(`Listening on port ${port}.`));
