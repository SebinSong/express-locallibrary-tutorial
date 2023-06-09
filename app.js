var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// constants
const isProd = process.env.NODE_ENV === 'production'

// pkgs
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')

const { connectToDB } = require('./db.js')

var app = express();

// connect to DB
connectToDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (isProd) {
  const limiter = RateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 20
  })
  app.use(compression())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'script-src': ['self', 'code.jquery.com', 'cdn.jsdelivr.net']
      }
    })
  )
  app.use(limiter)
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error('Error:: ', err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
