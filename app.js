const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const session = require('express-session');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
const { sequelize } = require('./database/models');

const app = express();

app.use(session({
  secret: 'cadena_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
    
  res.locals.isLoggedIn = req.session.userId ? true : false;
  res.locals.userId = req.session.userId;
  
  next();

});

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);

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

});

sequelize.sync()
app.listen(4000, () => {
  console.log('Server on')
})

module.exports = app;
