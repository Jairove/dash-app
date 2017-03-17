exports.refreshCovers = function() {
  var request = require('request');
  var fs = require('fs');

  var baseUrl = 'http://img.kiosko.net/';

  var dt = new Date();
  var dateString = dt.getFullYear() + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) +
                    "/" + ("0" + dt.getDate()).slice(-2);

  var format = '.750.jpg';

  var coverUrls = ["/es/elpais","/es/elmundo","/es/abc","/us/newyork_times","/fr/lemonde","/uk/the_times"];

  function performRequest(coverUrl) {
    var requestUrl = baseUrl + dateString + coverUrl + format;
    request.get({url: requestUrl, encoding: 'binary'}, function (err, response, body) {
      if(response.statusCode == 200)
        fs.writeFile("dist/assets/covers"+coverUrl+".jpg", body, 'binary', function(err) {
          if(err)
            console.log(err);
        });
    });
  }

  for(i=0; i < coverUrls.length; i++) {
    performRequest(coverUrls[i]);
  }

}
