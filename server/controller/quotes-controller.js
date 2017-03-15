//Calls the favqs api to retrieve the quote of the day
exports.get = function (req, res, next) {

  var request = require('request');
  request('https://favqs.com/api/qotd', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log(body);

      var quote = {
        text: body.quote.body,
        author: body.quote.author
      }
      res.send(quote);
    }
  })

}
