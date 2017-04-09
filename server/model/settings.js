var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var settingsSchema = new Schema({
    name : String, //TODO Remove this from here
    units: String,
    _userid : { type: ObjectId, ref: 'User' },
});

exports.Settings = mongoose.model("Settings",settingsSchema);
