var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var userDataSchema = new Schema({
    todos: [{type : ObjectId, ref: 'Todo'}]
});

exports.User = mongoose.model("User",userDataSchema);