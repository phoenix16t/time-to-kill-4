var MapsHandler = function() {
  this.map = null;
  this.markers = [];
  this.activeMarkers = [];
};

MapsHandler.prototype.constructor = MapsHandler;

MapsHandler.prototype.buildMap = function(coords, venues) {
  this.map = this.drawMap(coords);
  this.createMarker(coords, 'You are here', 'A');

  venues.forEach(function(venue, i) {
    var latLng = {
      lat: venue.latitude,
      lng: venue.longitude
    };

    var marker = this.createMarker(latLng, venue.name, i);
    this.markers.push(marker);
  }.bind(this));

  return this.markers;
};

MapsHandler.prototype.showMarkers = function(start, end) {
  this.clearMarkers();

  for(var i = start; i < end; i++) {
    var marker = this.markers[i];
    marker.setMap(this.map);
    this.activeMarkers.push(marker);
  }
};

MapsHandler.prototype.clearMarkers = function() {
  this.activeMarkers.forEach(function(marker) {
    marker.setMap(null);
  });
  this.activeMarkers = [];
};

MapsHandler.prototype.drawMap = function(coords) {
  return new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: coords
  });
};

MapsHandler.prototype.createMarker = function(latLng, title, label) {
  return new google.maps.Marker({
    position: latLng,
    title: title,
    label: '' + label
  });
};

MapsHandler.prototype.highlightMarker = function(count) {
  var marker = this.markers[count];
  marker.setAnimation(google.maps.Animation.BOUNCE);
};

MapsHandler.prototype.unhighlightMarker = function(count) {
  var marker = this.markers[count];
  marker.setAnimation(null);
};

module.exports = MapsHandler;
