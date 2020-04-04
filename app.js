const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signUp = require('./routes/signUp');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(signUp);

app.listen(port, () => console.log(`Listening on port ${port}...`));
