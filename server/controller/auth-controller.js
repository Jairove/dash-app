const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
//const user = require('../model/user');
const passport = require('passport');

var User = mongoose.model('User');

const widgetsController = require('./widget-controller');

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
      user._id = mongoose.Types.ObjectId();

      user.setPassword(req.body.password);
      user.save(function(err) {
        if(err) console.log(err);
        else {
          var token;
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
          // Initialize default dash
          widgetsController.createDefaultDash(user._id);
        }
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
        responseUser = {
          name: user.name,
          email: user.email
        }
        res.status(200).json(responseUser);
      });
  }
}


//Updates the profile of the current user (username and password)
exports.updateProfile = function (req, res, next) {
    var userid = req.payload._id;

    if(!req.body.email || !req.body.name) {
      res.status(400);
      res.json({
        "message" : "Name and email are required."
      });
      return;
    }

    // Check mail is unique
    User.findOne({ email: req.body.email }).exec(function(err, user){
      if(err) { throw err; res.send('ko'); }
      if(user) {
        if (user._id != userid) {
          res.status(400);
          res.json({
            "message" : "This email is already in use."
          });
          return;
        }
      }
    });

    //Update the user
    User.findByIdAndUpdate(userid, { name: req.body.name, email: req.body.email },
        {'new': true}, function(err,user) {
        if(err) { throw err; res.send('ko'); }
        res.send('ok');
    });

}

//Updates the profile of the current user
exports.changePassword = function (req, res, next) {
    var userid = req.payload._id;
    if(!req.body.password) {
      res.status(400);
      res.json({
        "message" : "Password is required."
      });
      return;
    }

    User.findOne({ _id: userid }).exec(function(err, user){
      var u = new User();
      u.name = user.name;
      u.email = user.email;
      u._id = user._id;

      u.setPassword(req.body.password);
      u.save(function(err) {
        if(err) console.log(err);
        else {
          res.status(200);
          res.send('Password updated');
          return;
        }
      });
    });
}

exports.facebookSignUp = function(req,res,next) {
  console.log('Facebook login attempt');
  passport.authenticate('facebook', { scope : 'email' });
}

exports.facebookLoginCallback = function(req, res, next) {
  passport.authenticate('facebook',
      {session: false, failureRedirect: '/' }),
          function(req, res, next) {
              var token = user.generateJwt();
              res.redirect("/dash/"+token);
          };
}
