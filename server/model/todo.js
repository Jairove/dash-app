var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var todoSchema = new Schema({
    _userid : { type: ObjectId, ref: 'User' },
    title : String,
    complete : Boolean
});

exports.Todo = mongoose.model("Todo",todoSchema);