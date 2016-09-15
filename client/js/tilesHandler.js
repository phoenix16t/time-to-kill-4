var q = require('q');

var TilesHandler = function() {
  this.tileField = document.querySelector('.venues');
  this.currentPage = 0;
  this.tiles = [];
};

TilesHandler.prototype.constructor = TilesHandler;

TilesHandler.prototype.buildTiles = function(venues) {
  venues.forEach(function(venue, i) {
    var button = this.createButton(venue, i);
    this.tiles.push(button);
  }.bind(this));

  return this.tiles;
};

TilesHandler.prototype.showTiles = function(start, end) {
  this.clearTiles();

  for(var i = start; i < end; i++) {
    var tile = this.tiles[i];
    this.tileField.appendChild(tile);
  }
};

TilesHandler.prototype.clearTiles = function() {
  this.tileField.innerHTML = '';
};

TilesHandler.prototype.hoverTile = function(i) {
  this.tiles[i].classList.add('hover');
};

TilesHandler.prototype.unhoverTile = function(i) {
  this.tiles[i].classList.remove('hover');
};

TilesHandler.prototype.createButton = function(venue, i) {
  var element = document.createElement('li');
  element.setAttribute('id', i);

  var h4 = document.createElement('h4');
  h4.innerHTML = venue.name;
  element.appendChild(h4);

  // var p = document.createElement('p');
  // p.innerHTML = venue.address + ' ' + venue.zip;
  // element.appendChild(p);

  // var p = document.createElement('p');
  // p.innerHTML = venue.phone;
  // element.appendChild(p);

  var p = document.createElement('p');
  p.innerHTML = 'Yelp rating: ' + venue.rating;
  element.appendChild(p);

  return element;
};

module.exports = TilesHandler;
