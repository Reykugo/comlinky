var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose')
var session = require('express-session');
var Store = require('connect-mongo')(session)

var app = express();

//Require models
require("./models/User");

const api = require("./api/")
app.use("/api", api);


//Connect to database
mongoose.Promise = global.Promise;
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/comlinky', function(err){
  if(err) {
    throw err;
  }
})

//Create sessions for users
app.use(session({
	store: new Store({mongooseConnection:mongoose.connection}),
    secret: 'secret',
    resave: false,
    saveUninitialized: true

}));

//Enable CORS
//Use for dev to communicate with angular when angular run to another port 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
 });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Static path to dist
app.use(express.static(path.join(__dirname, 'angular-app/dist')));
 
//Catch all other routes and return to the index file
app.get('*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'angular-app/dist/index.html'));
})

module.exports = app;