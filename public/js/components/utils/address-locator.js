import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addAddress } from '../../actions/actions';

const AddressLocator = React.createClass({

  findAddress: function(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);

    this.geocoder.geocode({'latLng': latLng}, this.parseResults);
  },

  parseResults: function(results, status) {
    if(status === google.maps.GeocoderStatus.OK) {
      var regex = /\w\w (\d{5}),/g;
      var address = results[0].formatted_address;
      address.match(regex);
      var zip = RegExp.$1;

      this.storeAddress(address, zip);
    }
  },

  storeAddress: function(address, zip) {
    store.dispatch(addAddress(address, zip));
  },

  componentWillMount: function() {
    this.geocoder = new google.maps.Geocoder();
  },

  componentWillReceiveProps: function(props) {
    this.findAddress(props.lat, props.lng);
  },

  render: function() {
    return null;
  }
});

export default AddressLocator;
