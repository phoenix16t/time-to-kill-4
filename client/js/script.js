var q = require('q');
var Geolocator = require('./geolocator.js');
var RequestHandler = require('./requestHandler.js');
var VenueRenderer = require('./venueRenderer.js');

var data = require("../../hidden/data.txt").server_data;

/**
 * Main application entry point
 * @constructor
 */
var MainApplication = function() {
  this.submitBtn = document.querySelector('.submit');
  this.coords = null;

  this.init();
};

MainApplication.prototype.constructor = MainApplication;

MainApplication.prototype.init = function() {
  this.locator = new Geolocator();
  this.requestHandler = new RequestHandler(this.locator);
  this.venueRenderer = new VenueRenderer();

  this.locator.findLatLng();

  this.submitBtn.addEventListener('click', function() {
    this.killTime();
  }.bind(this));
};

MainApplication.prototype.killTime = function() {
  var deferred = q.defer();

  return this.locator.findLatLng()
  .then(function(coords) {
    this.coords = coords;
    return this.requestHandler.onSubmit()
  }.bind(this))
  .then(function(venues) {
    console.log("venues", venues)
    this.venueRenderer.render(this.coords, venues);
  }.bind(this));
};

document.addEventListener("DOMContentLoaded", function(event) { 
  new MainApplication();
});
