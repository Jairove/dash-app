//Calls the openweathermap api to retrieve the weather forecast
exports.refresh = function (req, res, next) {
  var lon = req.query.lon;
  var lat = req.query.lat;
  var units = req.query.units;

  if(lon != null && lat!=null && units!=null) {

    var lang = req.query.lang;
    if(lang==null) lang = "es";

    var http = require('http');
    var key = "7fa9b10c5a391cccf5aa4196888b33e8";
    var options = {
      host: 'api.openweathermap.org',
      port: 80,
      path:"/data/2.5/weather?lat=" + lat + "&lon=" + lon +
            "&units=" + units + "&lang=" + lang + "&appid=" + key
    };

    http.get(options, function(resp){
      resp.on('data', function(chunk){
        res.send(chunk);
      });
    }).on("error", function(e){
      console.log("Error calling openweathermap api: " + e.message);
    });
  }
  else res.send("Invalid api call");
}
