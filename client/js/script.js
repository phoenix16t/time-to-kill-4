var q = require('q');
var QueryHandler = require('./queryHandler.js');
var VenueRenderer = require('./venueRenderer.js');
var data = require("../../hidden/data.txt").server_data;

/**
 * Main application entry point
 * @constructor
 */
var MainApplication = function() {
  this.submitBtn = document.querySelector('.submit');
  this.searchCtn = document.querySelector('.search');
  this.resultsCtn = document.querySelector('.results');
  this.backBtn = document.querySelector('.back');

  this.coords = null;

  this.init();
};

MainApplication.prototype.constructor = MainApplication;

MainApplication.prototype.init = function() {
  this.queryHandler = new QueryHandler();
  this.venueRenderer = new VenueRenderer();

  this.queryHandler.findCoords();

  this.submitBtn.addEventListener('click', function() {
    this.killTime();
  }.bind(this));

  this.backBtn.addEventListener('click', function() {
    this.displayPage('search');
  }.bind(this));
};

MainApplication.prototype.killTime = function() {
  var deferred = q.defer();
  var venueType = this.queryHandler.getVenueType();

  if(!venueType) {
    return;
  }

  this.displayPage('results');

  return this.queryHandler.findCoords()
  .then(function(coords) {
    this.coords = coords;
    return this.queryHandler.submit();
  }.bind(this))
  .then(function(venues) {
    this.venueRenderer.render(this.coords, venues);
  }.bind(this));
};

MainApplication.prototype.displayPage = function(page) {
  if(page === 'results') {
    this.searchCtn.classList.add('hidden');
    this.resultsCtn.classList.remove('hidden');
  }
  else if(page === 'search') {
    this.searchCtn.classList.remove('hidden');
    this.resultsCtn.classList.add('hidden');
  }
};

document.addEventListener("DOMContentLoaded", function(event) { 
  new MainApplication();
});
