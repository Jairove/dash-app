var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userDataSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hash: String,
    salt: String,
    //settings: {
      //type: ObjectId,
      //unique: true,
      //required: true,
      //ref: 'Settings'
    //},
    todos: [{type : ObjectId, ref: 'Todo'}],
    widgets: [{type : ObjectId, ref: 'Widget'}],
    facebookId; String
});

userDataSchema.methods.setPassword = function(password){
  // Create the salt
  this.salt = crypto.randomBytes(16).toString('hex');
  // Calculate hash
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userDataSchema.methods.validPassword = function(password) {
  // Calculate the hash
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  // Compare to calculated hash with stored hash
  return this.hash === hash;
};

userDataSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // I SHOULD NOT KEEP THE SECRET IN THE CODE!
};

exports.User = mongoose.model("User",userDataSchema);
