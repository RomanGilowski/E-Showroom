const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {sessionKeySecret} = require('./config')



//init datbase
require('./db/mongoose');





app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 12},
    resave: false
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));

app.use(ejsLayouts);
app.set('layout', 'layouts/main');

app.use(express.static('public'));
// bodyParser
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

//midleware
app.use('/', require('./middlewares/view-variables'));
app.use('/', require('./middlewares/user-middleware'));
app.use('/admin', require('./middlewares/is-auth-middleware'));


//routes
app.use(require('./routes/web'));

module.exports = app;