const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

const user = require('../model/user');
const todo = require('../model/todo');
var User = user.User;
var Todo = todo.Todo;


//TODO Delete will be deleted, only used for testing
//It retrieves all content of users collection
exports.indexAll = function (req, res, next) {
  User.find((err,data)=>{
      res.send(data);
  })
}

//Manages the creation of a new todo
exports.create = function (req,res,next) {
    //TODO This userid should be obtained from the user session or something similar
    var userid = req.payload._id;

    //Create a new todo
    var todo = new Todo();
    todo._userid = userid;
    todo._id = mongoose.Types.ObjectId();
    todo.title = req.body.title;
    todo.complete = req.body.complete;

    todo.save(function(err){
        if(err){ throw err; }
        console.log('saved: '+todo);
    })

    //Update the user's todo list
    User.findByIdAndUpdate(userid, {
        $push: { todos: todo._id }
    }, {'new': true}, function(err,user) {
        if(err) { throw err; }
        res.send(todo);
    });
}

//Manages the deletion of a new todo
exports.delete = function (req,res,next) {

    //Delete the todo
    Todo.findByIdAndRemove(req.params.id, function (err,todo){
        if(err) { throw err; }
        else {

            //Delete the reference from the user's todo list
            User.findByIdAndUpdate(todo._userid, {
                $pull: { todos: todo._id }
            }, function(err,user) {
                if(err) { throw err; }
            });

            res.send(todo);
        }
    })

}

//Manages the edition of a todo, updating title and state
exports.update = function (req, res, next) {
    Todo.findById(req.body._id, function(err, todo) {
        if (err) {
            console.log(err)
            return next(err)
        }
        else {
            todo.title = req.body.title || todo.title;
            todo.complete = req.body.complete;
            todo.save(function(err,save) {
                if (err) { res.status(500).send(err) }
                else res.send(save);
            })
        }
    })
}

//Retrieves the todos of a given user
exports.index = function (req, res, next) {
    //TODO This userid should be obtained from the user session or something similar
    var userid = req.payload._id;

    User.findById(userid).populate('todos').exec(function(err,user) {
        if (err||user===null) { res.status(500).send(err) }
        else {  res.send(user.todos); }
    })
}
