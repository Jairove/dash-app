var mongoose = require('mongoose')
, util = require('util')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

function BaseSchema() {
  Schema.apply(this, arguments);

  this.add({
      _id : {
        type: ObjectId,
        required: true,
        unique: true
      },
      _userid : {
        type: ObjectId,
        ref: 'User'
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
}
util.inherits(BaseSchema, Schema);

var WidgetSchema = new BaseSchema();

var QuotesWidgetSchema = new BaseSchema();
var TodoWidgetSchema = new BaseSchema({
  todos: [{type : ObjectId, ref: 'Todo'}],
  title: { type: String }
});
var WeatherWidgetSchema = new BaseSchema({
  lat: {type: String},
  lon: {type: String},
  units: {type: String}
});
var NewsWidgetSchema = new BaseSchema({
  title: { type: String },
  feedUrls: [{type: String }]
});
var CoversWidgetSchema = new BaseSchema();
var WelcomeWidgetSchema = new BaseSchema();

Widget = mongoose.model('Widget', WidgetSchema);
exports.Widget = mongoose.model('Widget', WidgetSchema);
exports.QuotesWidgetSchema = Widget.discriminator('QuotesComponent', QuotesWidgetSchema);
exports.TodoWidgetSchema = Widget.discriminator('TodoComponent', TodoWidgetSchema);
exports.WeatherWidgetSchema = Widget.discriminator('WeatherComponent', WeatherWidgetSchema);
exports.NewsWidgetSchema = Widget.discriminator('NewsRssComponent', NewsWidgetSchema);
exports.CoversWidgetSchema = Widget.discriminator('CoversComponent', CoversWidgetSchema);
exports.WelcomeWidgetSchema = Widget.discriminator('WelcomeComponent', WelcomeWidgetSchema);
