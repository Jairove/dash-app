const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
//const user = require('../model/user');
const passport = require('passport');

var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

exports.login = function(req,res,next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}

exports.register = function(req,res,next) {

  if(!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    res.json({
      "message" : "All fields are required."
    });
    return;
  }

  User.findOne({ email: req.body.email }).exec(function(err, user){

    if (user) {
      res.status(400);
      res.json({
        "message" : "This email is already in use."
      });
      return;
    }
    else {

      var user = new User();

      user.name = req.body.name;
      user.email = req.body.email;

      user.setPassword(req.body.password);
      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
      return;
    }
  });
}

exports.profile = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
}
