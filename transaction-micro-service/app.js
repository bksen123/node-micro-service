const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./core/db');
const session = require('express-session');
const transactionRoutes = require('./routes/transaction');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true

}).then(
  () => {
    console.log('Database is connected transaction micro-service', process.env.TXN_PORT)
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
);

const app = express();
app.use(session({
  secret: '64d0be94187e7aeabc6ebc7c336bfd51',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true,
}));
app.use('/transaction', transactionRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

/* app.listen( process.env.TXN_PORT, function(){
  console.log('Listening on 3000 Port', process.env.TXN_PORT);
}); */

module.exports = app;