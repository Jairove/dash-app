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
