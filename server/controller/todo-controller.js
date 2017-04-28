const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

const widget = require('../model/widgets');
const todo = require('../model/todo');
var TodoWidget = widget.TodoWidget;
var Todo = todo.Todo;


//Manages the creation of a new todo
exports.create = function (req,res,next) {

    var idwidget = req.params.idwidget;
    var todo = new Todo();
    todo._widgetid = idwidget;
    todo.title = req.body.title;
    todo.complete = req.body.complete;

    todo.save(function(err){
        if(err){ console.log(err); throw err; }
        console.log('saved: '+todo);
    })

    //Update the widget's todo list
    TodoWidget.findByIdAndUpdate(idwidget, {
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
            TodoWidget.findByIdAndUpdate(todo._widgetid, {
                $pull: { todos: todo._id }
            }, function(err,widget) {
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

//Retrieves the todos of a given widget
exports.index = function (req, res, next) {
    var widgetid = req.payload._id;

    TodoWidget.findById(widgetid).populate('todos').exec(function(err,widget) {
        if (err||widget===null) { res.status(500).send(err) }
        else {  res.send(widget.todos); }
    })
}
