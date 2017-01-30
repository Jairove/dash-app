const express = require('express');
const router = express.Router();
const API = 'https://jsonplaceholder.typicode.com';

const todoController  = require('../controller/todo-controller');

const mongoose = require( 'mongoose' );

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


// Routes
router.get('/todos/:id', todoController.index);
router.post('/todos', todoController.update);
router.put('/todos', todoController.create);
router.delete('/todos', todoController.delete);

module.exports = router;