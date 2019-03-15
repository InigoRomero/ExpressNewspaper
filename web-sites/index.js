const express = require('express');
const database = require('./database');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const path = require('path');

const app = express()

database.initializeMongo();

app.listen(3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/miBBDD', function(req, res){
    database.Usuario.find(function (err, kittens){
        if (err) return res.error(err);
        console.log(kittens);
        res.json(kittens);
    });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;