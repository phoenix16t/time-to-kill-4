var q = require('q');

/**
 * Geolocator for the current device
 * @constructor
 */
var Geolocator = function() {
  this.coords = null;
  this.zip = null;
};

Geolocator.prototype.constructor = Geolocator;

/**
 * Starts the geolocator sequence
 * @returns {promise} the current zip code wrapped in a promise
 */
Geolocator.prototype.findLocation = function() {
  return this.findLatLng()
  .then(function() {
    return this.findZip();
  }.bind(this));
};

/**
 * Find the latitude and longitude
 * @returns {promise} 
 */
Geolocator.prototype.findLatLng = function() {
  var deferred = q.defer();

  if(this.coords) {
    deferred.resolve();
    return deferred.promise;
  }
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(result, err) {
      if(err) {
        deferred.reject(new Error(err));
      }
      else {
        this.coords = result.coords;
        deferred.resolve();
      }
    }.bind(this));
  }

  return deferred.promise;
};

/**
 * Find the zip code
 * @returns {promise} the current zip code wrapped in a promise
 */
Geolocator.prototype.findZip = function() {
  var deferred = q.defer();

  if(this.zip) {
    deferred.resolve(this.zip);
    return deferred.promise;
  }

  var latlng = new google.maps.LatLng(this.coords.latitude, this.coords.longitude);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if(status === google.maps.GeocoderStatus.OK) {
      var regex = /\w\w (\d{5}),/g;
      results[0].formatted_address.match(regex);
      this.zip = RegExp.$1;
      deferred.resolve(this.zip);
    }
    else {
      console.error('Geocoder failed - ', status);
      deferred.reject(new Error(status));
    }
  }.bind(this));

  return deferred.promise;
};

module.exports = Geolocator;
