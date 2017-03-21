exports.refreshCovers = function() {
  var request = require('request');
  var fs = require('fs');

  // Make sure the directories exist
  var dir = './dist/assets/covers';
  if (!fs.existsSync(dir)) {
    mkdirParent(dir);
    fs.mkdirSync(dir+'/es');
    fs.mkdirSync(dir+'/us');
    fs.mkdirSync(dir+'/uk');
  }

  var baseUrl = 'http://img.kiosko.net/';

  var dt = new Date();
  var dateString = dt.getFullYear() + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) +
                    "/" + ("0" + dt.getDate()).slice(-2);

  var format = '.750.jpg';

  var coverUrls = ["/es/elpais","/es/elmundo","/es/abc","/us/newyork_times","/uk/the_times","/es/marca","/es/mundodeportivo"];

  function performRequest(coverUrl) {
    var requestUrl = baseUrl + dateString + coverUrl + format;
    request.get({url: requestUrl, encoding: 'binary'}, function (err, response, body) {
      if(response.statusCode == 200)
        fs.writeFile(dir+coverUrl+".jpg", body, 'binary', function(err) {
          if(err)
            console.log(err);
        });
      else console.log(response);
    });
  }

  for(i=0; i < coverUrls.length; i++) {
    performRequest(coverUrls[i]);
    console.log(coverUrls[i]);
  }

}

mkdirParent = function(dirPath, mode, callback) {
  var fs = require('fs');
  var path = require('path');

  fs.mkdir(dirPath, mode, function(error) {
    if (error && error.errno === 34) {
      //Create all the parents recursively
      fs.mkdirParent(path.dirname(dirPath), mode, callback);
      //And then the directory
      fs.mkdirParent(dirPath, mode, callback);
    }
    callback && callback(error);
  });
};
