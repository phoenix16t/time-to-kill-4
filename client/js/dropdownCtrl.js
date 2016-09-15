var DropdownCtrl = function() {
  this.venueBtn = document.querySelector('.venue-btn');
  this.list = document.querySelector('ul.venue-list');
  this.menuSelected = false;
  
  this.init();
};

DropdownCtrl.prototype.constructor = DropdownCtrl;

DropdownCtrl.prototype.init = function() {
  this.venueBtn.addEventListener('click', this.toggleMenu.bind(this));
  this.list.addEventListener('click', this.selectVenue.bind(this));
};

DropdownCtrl.prototype.selectVenue = function(e) {
  this.venueBtn.innerHTML = e.target.innerHTML;
  this.menuSelected = true;
  this.closeMenu();
};

DropdownCtrl.prototype.toggleMenu = function() {
  if(this.list.classList.contains('open')) {
    this.closeMenu();
    return;
  }
  
  this.openMenu();
};

DropdownCtrl.prototype.openMenu = function() {
  this.list.classList.add('open');
}

DropdownCtrl.prototype.closeMenu = function() {
  this.list.classList.remove('open');
}

DropdownCtrl.prototype.getVenue = function() {
  if(this.menuSelected) {
    return this.venueBtn.innerHTML;
  }

  return null;
}

module.exports = DropdownCtrl;
