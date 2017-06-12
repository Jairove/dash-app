const express = require('express');
const router = express.Router();
const todoController  = require('../controller/todo-controller');
const authController  = require('../controller/auth-controller');
const weatherController  = require('../controller/weather-controller');
const quotesController  = require('../controller/quotes-controller');
const widgetsController  = require('../controller/widget-controller');
const coversProxy  = require('../controller/covers-controller');
const jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/', (req, res) => {
  res.send('Greetings from api');
});

// To-dos Routes
router.get('/todos/:idwidget', auth, todoController.index);
router.post('/todos', auth, todoController.update);
router.put('/todos/:idwidget', auth, todoController.create);
router.delete('/todos/:id', auth, todoController.delete);

// Auth and profile Routes
router.post('/password', auth, authController.changePassword);
router.get('/profile', auth, authController.profile);
router.post('/profile', auth, authController.updateProfile);
router.post('/login', authController.login);
router.put('/register', authController.register);
router.post('/recoverpass', authController.forgotPassword);
router.post('/resetpass', authController.resetPassword);

// Widget info Routes
router.get('/weather', weatherController.refresh);
router.get('/coverproxy/:coverurl', coversProxy.performRequest);
router.get('/quote', quotesController.get);

// Widget Routes
router.get('/widgets', auth, widgetsController.index);
router.post('/widget', auth, widgetsController.updateWidget);
router.delete('/widget/:id', auth, widgetsController.removeWidget);

module.exports = router;
