const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

const user = require('../model/user');
var User = user.User;
const widgetModel = require('../model/widgets');
var Widget = widgetModel.Widget;
var TodoWidgetSchema = widgetModel.TodoWidgetSchema;
var WelcomeWidgetSchema = widgetModel.WelcomeWidgetSchema;
var QuotesWidgetSchema = widgetModel.QuotesWidgetSchema;
var CoversWidgetSchema = widgetModel.CoversWidgetSchema;
var NewsWidgetSchema = widgetModel.NewsWidgetSchema;
var WeatherWidgetSchema = widgetModel.WeatherWidgetSchema;

//Manages the creation of a new widget
exports.addWidget = function (req,res,next) {
    var userid = req.payload._id;
    //Create a new widget
    var widget = {
      __t: req.body.__t,
      colSize: req.body.colSize,
      pos: req.body.pos
    };

    create(userid,widget);
}

//Manages the creation of a new widget
function create (userid,widget) {
    // Set fields

    var newWidget;

    switch(widget.__t) {
      case 'WelcomeComponent':
        newWidget= new WelcomeWidgetSchema();
        break;
      case 'WeatherComponent':
        newWidget= new WeatherWidgetSchema();
        break;
      case 'NewsRssComponent':
        newWidget= new NewsWidgetSchema();
        break;
      case 'CoversComponent':
        newWidget= new CoversWidgetSchema();
        break;
      case 'QuotesComponent':
        newWidget = new QuotesWidgetSchema();
        break;
      case 'TodoComponent':
        newWidget= new TodoWidgetSchema();
        break;
      default:
        throw new Error('Invalid widget type: '+widget.__t);
    }

    newWidget._userid = userid;
    newWidget._id = mongoose.Types.ObjectId();
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

//Manages the update of a widget, creates a new one if it does not exist
exports.updateWidget = function (req, res, next) {

  if(req.body._id!=null) {
    console.log('Before find');
    Widget.findById(req.body._id, function(err, widget) {
        console.log('Enter find');
        if (err) {
            console.log(err)
            return next(err)
        }
        else {
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
    var widgets = [{__t: 'WelcomeComponent', colSize: "col-md-6", pos:0},
    {__t: 'WeatherComponent', colSize: "col-md-6", pos:1},{__t: 'CoversComponent', colSize: "col-md-12", pos:2},
    {__t: 'NewsRssComponent', colSize: "col-md-8", pos:3},{__t: 'QuotesComponent', colSize: "col-md-4", pos:4},
    {__t: 'TodoComponent', colSize: "col-md-4", pos:5}];

    //Save the widgets in DB
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
