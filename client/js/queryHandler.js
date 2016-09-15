var Geolocator = require('./geolocator.js');
var RequestHandler = require('./requestHandler.js');
var DropdownCtrl = require('./dropdownCtrl.js');

var QueryHandler = function() {
  this.dropdown = new DropdownCtrl;
  this.locator = new Geolocator();
  this.requestHandler = new RequestHandler(this.locator);

  this.locator.findLatLng();
};

QueryHandler.prototype.constructor = QueryHandler;

QueryHandler.prototype.findCoords = function() {
  return this.locator.findLatLng();
};

QueryHandler.prototype.getVenueType = function() {
  return this.dropdown.getVenue().toLowerCase();
};

QueryHandler.prototype.submit = function() {
  var type = this.getVenueType();
  return this.requestHandler.onSubmit(type);
}

module.exports = QueryHandler;
