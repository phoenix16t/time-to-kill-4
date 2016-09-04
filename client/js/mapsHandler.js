var MapsHandler = function() {
  this.venuesField = document.querySelector('.venues');
  this.arrows = document.querySelectorAll('.arrow');
  this.map = null;
  this.currentPage = 0;
  this.pageThreshold = 20;
  this.venueBtns = [];
  this.activeButtons = [];

  // this.venueBtns.length = 70;

  this.init();
};

MapsHandler.prototype.constructor = MapsHandler;

MapsHandler.prototype.init = function() {
  // debugger
  this.arrows.forEach(function(arrow) {
    arrow.addEventListener('click', function(e) {
      // console.log("click", e.target.)
      if(e.target.classList.contains('left')) {
        this.showPage(this.currentPage - 1);
      }
      else {
        this.showPage(this.currentPage + 1);
      }
    }.bind(this));
  }.bind(this));
};

MapsHandler.prototype.displayVenues = function(coords, venues) {
  this.map = this.drawMap(coords);
  this.createMarker(coords, 'You are here', 'A');

  venues.forEach(function(venue, i) {
    var latLng = {
      lat: venue.latitude,
      lng: venue.longitude
    };

    this.createMarker(latLng, venue.name, i);

    var button = this.createButton(venue);
    this.venueBtns.push(button);
    this.hideButton(button);
  }.bind(this));

  this.showPage(0);
};

MapsHandler.prototype.drawMap = function(coords) {
  return new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: coords
  });
}

MapsHandler.prototype.createMarker = function(latLng, title, label) {
  return new google.maps.Marker({
    position: latLng,
    map: this.map,
    title: title,
    label: '' + label
  });
};

MapsHandler.prototype.showPage = function(page) {
  if(page < 0) {
    page = 0;
  }
  this.currentPage = page;

  var start = page * this.pageThreshold;
  var end = start + this.pageThreshold;

  if(start > this.venueBtns.length) {
    this.showPage(page - 1);
    return;
  }
  else if(end > this.venueBtns.length) {
    end = this.venueBtns.length;
  }

  this.activeButtons.forEach(function(button) {
    this.hideButton(button);
  }.bind(this));

  this.activeButtons = [];

  for(var i = start; i < end; i++) {
    this.showButton(this.venueBtns[i]);
    this.activeButtons.push(this.venueBtns[i]);
  }
}

MapsHandler.prototype.createButton = function(venue) {
  var venueLink = this.addButtonInfo(venue);

  venueLink.addEventListener('mouseover', function() {
    console.log("clicked", venue.id)
  })

  this.venuesField.appendChild(venueLink);
  return venueLink;
};

MapsHandler.prototype.hideButton = function(button) {
  button.classList.add('hidden');
};

MapsHandler.prototype.showButton = function(button) {
  button.classList.remove('hidden');
};

MapsHandler.prototype.addButtonInfo = function(venue) {
  var venueEl = document.createElement('li');

  var h4 = document.createElement('h4');
  h4.innerHTML = venue.name;
  venueEl.appendChild(h4);

  var p = document.createElement('p');
  p.innerHTML = venue.address + ' ' + venue.zip;
  venueEl.appendChild(p);

  var p = document.createElement('p');
  p.innerHTML = venue.phone;
  venueEl.appendChild(p);

  var p = document.createElement('p');
  p.innerHTML = 'Yelp rating: ' + venue.rating;
  venueEl.appendChild(p);

  return venueEl;
};

module.exports = MapsHandler;
