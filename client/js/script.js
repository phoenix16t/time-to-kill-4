var q = require('q');
var request = require('request');
var Geolocator = require('./geolocator.js');

/**
 * Main application entry point
 * @constructor
 */
var MainApplication = function() {
  this.submitBtn = document.querySelector('.submit');
  this.venueType = document.querySelector('.venue-type');
  this.time = document.querySelector('.spare-time');
  this.venuesField = document.querySelector('.venues');

  this.zip = null;

  this.init();
};

MainApplication.prototype.constructor = MainApplication;

/**
 * Initialize
 */
MainApplication.prototype.init = function() {
  this.initializeGeolocator();
  this.findZip();

  this.submitBtn.addEventListener('click', function() {
    this.clickHandler();
  }.bind(this));
};

MainApplication.prototype.initializeGeolocator = function() {
  this.geolocator = new Geolocator();
};

/**
 * Click handler
 */
MainApplication.prototype.clickHandler = function() {
  var time = this.time.value;
  var type = this.venueType.value;

  return this.findZip()
  .then(function(zip) {
    return this.handleRequest(time, type, zip)
  }.bind(this))
  .then(function(venues) {
    this.displayVenues(venues);
  }.bind(this));
};

MainApplication.prototype.findZip = function() {
  var deferred = q.defer();

  if(!this.zip) {
    this.geolocator.findLocation()
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

MainApplication.prototype.displayVenues = function(venues) {
  this.venuesField.innerHTML = '';

  venues.forEach(function(venue) {
    var str = venue.name;
    str += '<br>Address: ' + venue.address + ' ' + venue.zip;
    str += '<br>Phone: ' + venue.phone;
    str += '<br>Rating: ' + venue.rating + '<br>';

    var el = document.createElement('li');
    el.innerHTML = str;
    this.venuesField.appendChild(el);
  }.bind(this));
};

document.addEventListener("DOMContentLoaded", function(event) { 
  new MainApplication();
});
