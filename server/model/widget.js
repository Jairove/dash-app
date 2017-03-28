var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var widgetSchema = new Schema({
    _id : {
      type: ObjectId,
      required: true,
      unique: true
    },
    _userid : {
      type: ObjectId,
      ref: 'User'
    },
    type : {
      type: String,
      required: true
    },
    colSize : {
      type: String,
      required: true
    },
    pos : {
      type: Number,
      required: true
    }
});

exports.Widget = mongoose.model("Widget",widgetSchema);
