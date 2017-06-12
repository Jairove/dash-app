const mongoose = require('mongoose').set('debug', true)
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
//const user = require('../model/user');
const passport = require('passport');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

var User = mongoose.model('User');

const widgetsController = require('./widget-controller');

exports.login = function(req,res,next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404);
      res.json(err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "name": user.name
      });
    } else {
      // If user is not found
      res.status(401);
      res.json(info);
    }
  })(req, res);
}

exports.register = function(req,res,next) {

  if(!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    res.json({
      "message" : "All fields are required"
    });
    return;
  }

  User.findOne({ email: req.body.email }).exec(function(err, user){

    if (user) {
      res.status(400);
      res.json({
        "message" : "This email is already in use"
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

      let mailOptions = {
          from: '"Dashpot" <mailer@dashpot.co>', // sender address
          to: user.email, // list of receivers
          subject: 'Welcome to dashpot.', // Subject line
          html: '<p><b>Welcome to dashpot!</b></p> <p>Thank you for registering at dashpot, we hope you find it useful.</p>'
      };

      sendEmail(mailOptions);

      return;
    }
  });
}


exports.profile = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json("UnauthorizedError: private profile");
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        responseUser = {
          name: user.name,
          email: user.email
        }
        res.status(200);
        res.json(responseUser);
      });
  }
}

//Updates the profile of the current user (username and password)
exports.updateProfile = function (req, res, next) {
    var userid = req.payload._id;

    if(!req.body.email || !req.body.name) {
      res.status(400);
      res.json("Name and email are required");
      return;
    }

    // Check mail is unique
    User.findOne({ email: req.body.email }).exec(function(err, user){
      if(err) { throw err; res.send('ko'); }
      if(user) {
        if (user._id != userid) {
          res.status(400);
          res.json("This email is already in use");
          return;
        }
      }
    });

    //Update the user
    User.findByIdAndUpdate(userid, { name: req.body.name, email: req.body.email },
        {'new': true}, function(err,user) {
        if(err) { throw err; res.json('There was an error updating the profile'); }
        res.json('Profile updated');
    });

}

//Updates the profile of the current user
exports.changePassword = function (req, res, next) {

    var userid = req.payload._id;
    if(!req.body.password) {
      res.status(400);
      res.json('Password is required');
      return;
    }

    User.findOne({ _id: userid }).exec(function(err, user){
      user.setPassword(req.body.password);
      user.save(function(err) {
        if(err) console.log(err);
        else {
          res.status(200);
          res.json('Password updated');
        }
      });
    });

    let mailOptions = {
        from: '"Dashpot" <mailer@dashpot.co>', // sender address
        to: user.email, // list of receivers
        subject: 'Password changed.', // Subject line
        html: '<p><b>Your password has been changed!</b></p> <p>'+
        'Your dashpot password has been changed, if you did not do this change please reset it now.</p>'
    };

    sendEmail(mailOptions);

}

//Updates the profile of the current user
exports.forgotPassword = function (req, res) {
    var email = req.body.email;
    const recoveryUrl = 'http://localhost:3000/password-recover/';

    User.findOne({ email: email }).exec(function(err, user){
      if(user) {
        var token = user.setRecoveryToken();
        user.save(function(err) {
          if(err) console.log(err);
          else {
            res.status(200);
            res.json('ok');
            return;
          }
        });

        let mailOptions = {
            from: '"Dashpot" <mailer@dashpot.co>', // sender address
            to: email, // list of receivers
            subject: 'Recover your password', // Subject line
            html: '<p>You have requested a password reset.</p><b>Follow this link to change your password:</b> '+
            '<a href="'+recoveryUrl+token+'">'+recoveryUrl+token+'</a>' // html body
        };

        sendEmail(mailOptions);

      }
      else {
        res.status(400);
        res.json('Invalid email');
        return;
      }

    });

}

function sendEmail(mailOptions) {

  let transporter = nodemailer.createTransport(smtpTransport({
     host: 'hl302.hosteurope.es',
     port: 465,
     auth: {
         user: 'mailer@dashpot.co',
         pass: 'wxcfZIMWdFk*'
     }
  }));

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return;
}

exports.resetPassword = function (req, res) {

    var password = req.body.password;
    var token = req.body.token;

    User.findOne({ recoveryToken: token }).exec(function(err, user){
      if(user) {
        user.recoveryToken = null;
        user.setPassword(password);
        user.save(function(err) {
          if(err) console.log(err);
          else {
            res.status(200);
            res.json('ok');
            return;
          }
        });
      }
      else {
        res.status(400);
        res.json('Invalid token');
        return;
      }
      if(err) {
        console.error(err);
        res.status(500);
        res.json(err);
        return;
      }

    });

}
