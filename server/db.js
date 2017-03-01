// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = 'mongodb://heroku_83p8gltv:favoopqcanbff4cm0r348fmk5s@ds113000.mlab.com:13000/heroku_83p8gltv'; 

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
var userSchema = require('./model/user');
var todoSchema = require('./model/todo');
