const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const directors = require("./routes/directors");
const user  = require('./routes/user');
//secret_keys

const secret = require("./secret"); 

//middleware
const tokenverify = require('./middleware/verify-token'); 
const verifyToken = require('./middleware/verify-token');

// db
const mongo = require("./helper/db")();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// secret keys

app.set('secret_keys',secret.secret_keys);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movies', movie);
app.use('/api/directors',directors);
app.use('/user',user);
app.use('/api',verifyToken);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
