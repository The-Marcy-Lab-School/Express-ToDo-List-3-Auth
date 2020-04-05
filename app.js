const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const todoRoute = require('./routes/taskRoute');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.render('register');
// });

app.use(todoRoute);


app.listen(port, () => console.log(`Listening on port ${port}.`));
