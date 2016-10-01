var express = require('express');
var app = express();

var q = require('q');
var http = require('http');
// var VenueLocator = require('./venueLocator.js');

// var setHeaders = function(response) {
//   response.setHeader('Content-Type', 'application/json');
//   response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   response.setHeader('Access-Control-Allow-Credentials', 'true');
// };

// var sendResponse = function(response, data) {
//   setHeaders(response);
//   response.write(JSON.stringify(data));
//   response.end();
// };

// http.createServer(function(request, response) {
//   var dataStr = '';
  

// console.log("request", request)
// sendResponse(response, "hello")

//   // request.on('data', function(chunk) {
//   //   dataStr += chunk;
//   // });

//   // request.on('end', function() {
//   //   var data = JSON.parse(dataStr);
//   //   var locator = new VenueLocator(data);

//   //   return locator.locateVenues()
//   //   .then(function(data) {
//   //     sendResponse(response, data);
//   //   });
//   // });

// }).listen(8080);

app.use(express.static(__dirname + '/public'), function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/kill-time', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('listening 8080...');
});

// console.log("listening 8080...");
