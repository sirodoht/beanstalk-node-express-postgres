/**
 * Marvy
 * Node / Express / PostgreSQL boilerplate for AWS Elastic Beanstalk
 *
 * @author Theodore Keloglou
 * @file Main application boot file.
 */

const express = require('express');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./routes/index');
const models = require('./models');

const app = express();

app.set('views', path.join(__dirname, '../front/views'));
app.set('view engine', 'pug');

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(favicon(path.join(__dirname, '../front/static', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, '../front/static')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT;
}
app.set('port', port);

models.sequelize.sync({ force: true })
// models.sequelize.sync()
  .then(function () {
    app.listen(port);
    app.on('error', function (error) {
      console.error('App error:', error);
      process.exit(1);
    });
    console.log('Server running on port:', port);
  });

module.exports = app;
