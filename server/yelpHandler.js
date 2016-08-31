var data = require("../hidden/data.txt").yelp;
var yelpConnect = require("yelp").createClient(data);
var q = require('q');

var YelpHandler = function() {
  this.businessObj = {};
  this.uniqueResults = [];

  this.options = {
    limit: 20,
    offset: 0,
    sort: 1
  };
};

YelpHandler.prototype.constructor = YelpHandler;

YelpHandler.prototype.search = function(zipList, venueType) {
  this.updatedZips = [];

  zipList.forEach(function(zip) {
    var zipResults = this.searchZip(zip, venueType);
    this.updatedZips.push(zipResults);
  }.bind(this));

  return q.all(this.updatedZips)
          .then(this.flattenBatches)
          .then(this.removeDupes)
          .then(function(data) {
            return data;
          });
};

YelpHandler.prototype.searchZip = function(zip, venueType) {
  this.options.location = zip;
  this.options.category_filter = venueType;

  return q.all([
    this.makeRequest(0),
    this.makeRequest(20)
  ])
  .then(this.flattenBatches);
};

YelpHandler.prototype.makeRequest = function(offset) {
  var deferred = q.defer();

  this.options.offset = offset;

  yelpConnect.search(this.options, function(err, results) {
    deferred.resolve(this.parseResults(results));
  }.bind(this));

  return deferred.promise;
};

YelpHandler.prototype.parseResults = function(results) {
  if(results && results.businesses) {
    return results.businesses
    .filter(function(business) {
      return business.location.coordinate;
    })
    .map(function(business) {
      var locale = business.location;
      return {
        id: business.id,
        name: business.name,
        address: [locale.address[0],locale.city,locale.state_code].join(', ') ,
        zip: locale.postal_code,
        latitude: locale.coordinate.latitude,
        longitude: locale.coordinate.longitude,
        rating: business.rating,
        phone: business.phone
      };
    });
  }
};

YelpHandler.prototype.flattenBatches = function(batches) {
  return [].concat.apply([], batches);
};

YelpHandler.prototype.removeDupes = function(records) {
  var businessObj = {};
  var uniqueResults = [];

  records.forEach(function(record) {
    if(!businessObj[record.id]) {
      businessObj[record.id] = true;
      uniqueResults.push(record);
    }
  });

  return uniqueResults;
};

module.exports = YelpHandler;
