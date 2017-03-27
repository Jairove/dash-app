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

//Manages the update of the widgets array
exports.updateDash = function (req, res, next) {
    var userid = req.payload._id;
    var newWidgets = req.body.widgets;

    //Update the user's widget list
    User.findByIdAndUpdate(userid, {
        $set: { widgets: newWidgets }
    }, {'new': true}, function(err,user) {
        if(err) { throw err; }
    });
}


//Manages the creation of a new widget
exports.createDefaultDash = function(userid) {
    var widgets = [{type: 'WelcomeComponent', colSize: "col-md-6"},
    {type: 'WeatherComponent', colSize: "col-md-6"},{type: 'CoversComponent', colSize: "col-md-12"},
    {type: 'NewsRssComponent', colSize: "col-md-8"},{type: 'QuotesComponent', colSize: "col-md-4"},
    {type: 'TodoComponent', colSize: "col-md-4"}];

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
