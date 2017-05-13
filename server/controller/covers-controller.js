
exports.performRequest = function (req, res, next) {

  var request = require('request');
  var baseUrl = 'http://img.kiosko.net/';
  var requestUrl = req.params.coverurl;

  console.log(requestUrl);


  request.get({url: baseUrl + requestUrl, encoding: 'binary'}, function (err, response, body) {
      if(response.statusCode==200)
        res.send(JSON.stringify('ok'));
      else res.send(JSON.stringify('ko'));
  });
}
