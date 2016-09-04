var q = require('q');
var request = require('request');
var Geolocator = require('./geolocator.js');
var MapsHandler = require('./mapsHandler.js');

/**
 * Main application entry point
 * @constructor
 */
var MainApplication = function() {
  this.submitBtn = document.querySelector('.submit');
  this.venueType = document.querySelector('.venue-type');
  this.time = document.querySelector('.spare-time');

  this.zip = null;

  this.init();
};

MainApplication.prototype.constructor = MainApplication;

/**
 * Initialize
 */
MainApplication.prototype.init = function() {
  this.geolocator = new Geolocator();
  this.mapsHandler = new MapsHandler();
  this.findLocation();

  this.submitBtn.addEventListener('click', function() {
    this.submitHandler();
  }.bind(this));
};

/**
 * Submit handler
 */
MainApplication.prototype.submitHandler = function() {
  var time = this.time.value;
  var type = this.venueType.value;

  return this.findLocation()
  .then(function(zip) {
    return this.handleRequest(time, type, zip)
  }.bind(this))
  .then(function(venues) {
    this.mapsHandler.displayVenues(this.coords, venues);
  }.bind(this));
};

MainApplication.prototype.findLocation = function() {
  var deferred = q.defer();

  if(!this.coords) {
    return this.geolocator.findLatLng()
    .then(function(coords) {
      this.coords = coords;
      return this.geolocator.findZip();
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

MainApplication.prototype.handleRequest = function(time, venueType, zip) {
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

document.addEventListener("DOMContentLoaded", function(event) { 
  new MainApplication();
});
