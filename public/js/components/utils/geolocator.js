import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addLatLng } from '../../actions/actions';

const Geolocator = React.createClass({

  findCoords: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(result, err) {
        var lat = result.coords.latitude;
        var lng = result.coords.longitude;

        store.dispatch(addLatLng(lat, lng));
      });
    }
  },

  componentWillMount: function() {
    this.findCoords();
  },

  render: function() {
    return null;
  }
});

export default Geolocator;
