var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var todoSchema = new Schema({
    _widgetid : { type: ObjectId, ref: 'TodoWidget' },
    title : String,
    complete : Boolean
});

exports.Todo = mongoose.model("Todo",todoSchema);
