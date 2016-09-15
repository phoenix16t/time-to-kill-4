var q = require('q');
var request = require('request');

var RequestHandler = function(locator) {
  this.locator = locator;
  this.time = document.querySelector('.spare-time');
  this.venueType = document.querySelector('.venue-type');

  this.zip = null;

  this.init();
};

RequestHandler.prototype.constructor = RequestHandler;

/**
 * Initialize
 */
RequestHandler.prototype.init = function() {
  this.findLocation();
};

RequestHandler.prototype.findLocation = function() {
  var deferred = q.defer();

  if(!this.coords) {
    return this.locator.findLatLng()
    .then(function(coords) {
      this.coords = coords;
      return this.locator.findZip();
    }.bind(this))
    .then(function(zip) {
      this.zip = zip;
      deferred.resolve(zip);
    }.bind(this));
  }
  else {
    deferred.resolve(this.zip);
  }

  return deferred.promise;
};

/**
 * Submit handler
 */
RequestHandler.prototype.onSubmit = function(venueType) {
  var time = this.time.value;

  return this.findLocation()
  .then(function(zip) {
    return this.handleRequest(time, venueType, zip)
  }.bind(this));
};

RequestHandler.prototype.handleRequest = function(time, venueType, zip) {
  var deferred = q.defer();

  var data = {
    time: time,
    venueType: venueType,
    zip: zip
  };

  var options = {
    url: 'http://localhost:8080',
    method: 'POST',
    body: JSON.stringify(data)
  };

  request(options, function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });

  return deferred.promise;
};

module.exports = RequestHandler;
