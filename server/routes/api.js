const express = require('express');
const router = express.Router();
const API = 'https://jsonplaceholder.typicode.com';
const todoController  = require('../controller/todo-controller');
const authController  = require('../controller/auth-controller');
const weatherController  = require('../controller/weather-controller');
const quotesController  = require('../controller/quotes-controller');
const widgetsController  = require('../controller/widget-controller');
const coversProxy  = require('../controller/covers-controller');
const mongoose = require( 'mongoose' );
const jwt = require('express-jwt');
const passport = require('passport');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


// To-dos Routes
router.get('/todos/:idwidget', auth, todoController.index);
router.post('/todos', auth, todoController.update);
router.put('/todos/:idwidget', auth, todoController.create);
router.delete('/todos/:id', auth, todoController.delete);

// Auth Routes
router.post('/password', auth, authController.changePassword);
router.get('/profile', auth, authController.profile); //to handle new users registering
router.post('/profile', auth, authController.updateProfile); //to handle new users registering
router.post('/login', authController.login); //to handle new users registering
router.put('/register', authController.register); //to return profile details when given a USERID

router.get('/weather', weatherController.refresh);


router.get('/coverproxy/:coverurl', coversProxy.performRequest);

router.get('/quote', quotesController.get);

router.get('/widgets', auth, widgetsController.index);
router.post('/widget', auth, widgetsController.updateWidget);
router.delete('/widget/:id', auth, widgetsController.removeWidget);


router.post('/recoverpass', authController.forgotPassword);
router.post('/resetpass', authController.resetPassword);

module.exports = router;
