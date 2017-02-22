const express = require('express');
const router = express.Router();
const API = 'https://jsonplaceholder.typicode.com';
const todoController  = require('../controller/todo-controller');
const authController  = require('../controller/auth-controller');
const mongoose = require( 'mongoose' );
const jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


// To-dos Routes
router.get('/todos', todoController.index);
router.post('/todos', todoController.update);
router.put('/todos', todoController.create);
router.delete('/todos/:id', todoController.delete);

// Auth Routes
router.get('/profile/:userid', auth, authController.profile); //to handle new users registering
router.post('/login', authController.login); //to handle new users registering
router.put('/register', authController.register); //to return profile details when given a USERID


module.exports = router;
