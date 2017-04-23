const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

const user = require('../model/user');
var User = user.User;
const widgetModel = require('../model/widget');
var Widget = widgetModel.Widget;

//Manages the creation of a new widget
exports.addWidget = function (req,res,next) {
    var userid = req.payload._id;

    //Create a new widget
    var widget = new Widget();
    widget.type = req.body.type;
    widget.colSize = req.body.colSize;

    create(userid,widget);
}

//Manages the creation of a new widget
function create (userid,widget) {
    // Set fields
    var newWidget= new Widget();
    newWidget._userid = userid;
    newWidget._id = mongoose.Types.ObjectId();
    newWidget.type = widget.type;
    newWidget.colSize = widget.colSize;
    newWidget.pos = widget.pos;

    console.log(newWidget);

    // Save the widget to DB
    newWidget.save(function(err){
        if(err){ throw err; }
        console.log('saved: '+newWidget);
    })

    //Update the user's widget list
    User.findByIdAndUpdate(userid, {
        $push: { widgets: newWidget._id }
    }, {'new': true}, function(err,user) {
        if(err) { throw err; }
    });
}

// //Manages the update of the widgets array
// exports.updateDash = function (req, res, next) {
//     var userid = req.payload._id;
//     var newWidgets = req.body.widgets;
//
//     //Update the user's widget list
//     User.findByIdAndUpdate(userid, {
//         $set: { widgets: newWidgets }
//     }, {'new': true}, function(err,user) {
//         if(err) { throw err; }
//     });
// }

//Manages the update of a widget, creates a new one if it does not exist
exports.updateWidget = function (req, res, next) {

  if(req.body._id!=null) {

    Widget.findById(req.body._id, function(err, widget) {
        if (err) {
            console.log(err)
            return next(err)
        }
        else {
              widget.type = req.body.type || widget.type;
              widget.colSize = req.body.colSize || widget.colSize;
              widget.pos = req.body.pos;

              widget.save(function(err,save) {
                  if (err) { res.status(500).send(err) }
                  else res.send(save);
              })
        }
      })
    }

  else create(req.payload._id, req.body);

}



//Manages the creation of a new widget
exports.createDefaultDash = function(userid) {
    var widgets = [{type: 'WelcomeComponent', colSize: "col-md-6", pos:0},
    {type: 'WeatherComponent', colSize: "col-md-6", pos:1},{type: 'CoversComponent', colSize: "col-md-12", pos:2},
    {type: 'NewsRssComponent', colSize: "col-md-8", pos:3},{type: 'QuotesComponent', colSize: "col-md-4", pos:4},
    {type: 'TodoComponent', colSize: "col-md-4", pos:5}];

    // Save the widgets in DB
    for (widget of widgets) {
      create(userid,widget);
    }
}

//Retrieves the widgets of a user
exports.index = function (req, res, next) {
    var userid = req.payload._id;

    User.findById(userid).populate('widgets').exec(function(err,user) {
        if (err||user===null) { res.status(500).send(err) }
        else {  res.send(user.widgets); }
    })
}

//Manages the deletion of a new todo
exports.removeWidget = function (req,res,next) {

    //Delete the todo
    Widget.findByIdAndRemove(req.params.id, function (err,widget){
        if(err) { throw err; }
        else {
          if( widget != null ) {
            //Delete the reference from the user's todo list
            User.findByIdAndUpdate(widget._userid, {
                $pull: { widgets: widget._id }
            }, function(err,user) {
                if(err) { throw err; }
            });

            res.send('ok');
          }
        }
    })

}
