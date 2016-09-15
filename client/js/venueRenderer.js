var q = require('q');
var MapsHandler = require('./mapsHandler.js');
var TilesHandler = require('./tilesHandler.js');

var VenueRenderer = function() {
  this.arrows = document.querySelectorAll('.arrow');
  this.tileField = document.querySelector('.venues');

  this.tiles = [];
  this.markers = [];
  this.currentPage = 0;
  this.pageThreshold = 10;

  this.init();
};

VenueRenderer.prototype.constructor = VenueRenderer;

VenueRenderer.prototype.init = function() {
  this.handleArrows();
};

VenueRenderer.prototype.render = function(coords, venues) {
  this.mapsHandler = new MapsHandler();
  this.tilesHandler = new TilesHandler();

  this.markers = this.mapsHandler.buildMap(coords, venues);
  this.tiles = this.tilesHandler.buildTiles(venues);
  this.handleEvents();

  this.setPage(0);
};

VenueRenderer.prototype.handleArrows = function() {
  this.arrows.forEach(function(arrow) {
    arrow.addEventListener('click', function(e) {
      if(e.target.classList.contains('left')) {
        this.setPage(this.currentPage - 1);
      }
      else {
        this.setPage(this.currentPage + 1);
      }
    }.bind(this));
  }.bind(this));
};

VenueRenderer.prototype.handleEvents = function() {
  for(var i = 0; i < this.tiles.length; i++) {
    var tile = this.tiles[i];
    var marker = this.markers[i];

    (function(i) {
      tile.addEventListener('mouseenter', function() {
        this.mapsHandler.highlightMarker(i);
      }.bind(this));
    }.bind(this) (i));
    (function(i) {
      tile.addEventListener('mouseleave', function() {
        this.mapsHandler.unhighlightMarker(i);
      }.bind(this));
    }.bind(this) (i));

    (function(i) {
      marker.addListener('mouseover', function() {
        this.tilesHandler.hoverTile(i);
      }.bind(this));
    }.bind(this) (i));
    (function(i) {
      marker.addListener('mouseout', function() {
        this.tilesHandler.unhoverTile(i);
      }.bind(this));
    }.bind(this) (i));
  }
};

VenueRenderer.prototype.setPage = function(pageNum) {
  if(pageNum < 0) {
    pageNum = 0;
  }
  this.currentPage = pageNum;

  var start = pageNum * this.pageThreshold;
  var end = start + this.pageThreshold;

  if(start > this.tiles.length) {
    this.setPage(pageNum - 1);
    return;
  }
  else if(end > this.tiles.length) {
    end = this.tiles.length;
  }

  this.tilesHandler.showTiles(start, end);
  this.mapsHandler.showMarkers(start, end);
};

module.exports = VenueRenderer;
