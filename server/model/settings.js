var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var settingsSchema = new Schema({
    name : String
});

exports.Settings = mongoose.model("Settings",settingsSchema);
