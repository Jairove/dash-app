const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

const user = require('../model/user');
var User = user.User;

const settings = require('../model/settings');
var Settings = settings.Settings;


//Retrieves the settings of the current user
exports.get = function (req, res, next) {
    var userid = req.payload._id;

    User.findById(userid).exec(function(err,user) {
        if (err||user===null) { res.status(500).send(err) }
        else {  res.send(user); }
    })
}

//Updates the profile of the current user
exports.save = function (req, res, next) {
    var userid = req.payload._id;
    if(!req.body.units) {
      res.status(400);
      res.json({
        "message" : "Settings are required."
      });
      return;
    }

    Settings.findOne({ _userid: userid }).exec(function(err, settings){
      var newSettings= new Settings();
      newSettings.units = req.payload.units;

      newSettings.save(function(err) {
        if(err) {
          console.log(err);
          res.send('ko');
        }
        else {
          res.status(200);
          res.send('ok');
          return;
        }
      });
    });
}

//Manages the creation of a new widget
exports.createDefaultSettings = function(userid, settings) {
    var settings= new Settings();
    settings._userid = userid;
    settings.units = 'metric';

    // Save the settings to DB
    settings.save(function(err){
        if(err){ throw err; }
        console.log('saved: '+settings);
    })

}
