var q = require('q');
var request = require('request');
var data = require('../hidden/data.txt');
var YelpHandler = require('./yelpHandler.js');
var yelp = new YelpHandler();

var VenueLocator = function(data) {
  this.time = data.time;
  this.venueType = data.venueType;
  this.zip = data.zip;
};

VenueLocator.prototype.contructor = VenueLocator;

VenueLocator.prototype.locateVenues = function() {
  return this.findNearbyZips()
  .then(function(zipList) {
    return this.findVenues(zipList);
  }.bind(this));
};

VenueLocator.prototype.distance = function() {
  return this.time * 5 / 2;
};

VenueLocator.prototype.findNearbyZips = function() {
  var deferred = q.defer();
  var url = 'http://www.zipcodeapi.com/rest/' + data.zipapi + '/radius.json/' + this.zip + '/' + this.distance() + '/km';
  var zipList = [];

  request(url, function (err, resp, body) {
    if (!err && resp.statusCode == 200) {
      JSON.parse(body).zip_codes.forEach(function(zip) {
        zipList.push(zip.zip_code);
      });
      deferred.resolve(zipList);
    }
  });

  return deferred.promise;
};

VenueLocator.prototype.findVenues = function(zipList) {
  return yelp.search(zipList, this.venueType)
  .then(function(data) {
    return data;
  });
};

module.exports = VenueLocator;
