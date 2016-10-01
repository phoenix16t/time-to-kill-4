import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Geolocator from '../utils/geolocator';
import AddressLocator from '../utils/address-locator';
import QueryLayoutView from '../views/query-layout-view';

const QueryLayout = React.createClass({

  componentWillMount: function() {
    this.venueTypeList = [
      'Bars',
      'Restaurants',
      'Lounges'
    ];

    this.times = [
      ':30',
      '1',
      '1:30',
      '2',
      '2:30',
      '3'
    ]
  },

  render: function() {
    return (
      <div className="search container">
        address - {this.props.address} - {this.props.zip}
        <Geolocator />
        <AddressLocator lat={this.props.lat} lng={this.props.lng} />
        <QueryLayoutView venueTypes={this.venueTypeList} times={this.times} />
      </div>
    );
  }
});

const mapStateToProps = function(store) {
  return {
    lat: store.lat,
    lng: store.lng,
    address: store.address,
    zip: store.zip
  };
};

export default connect(mapStateToProps)(QueryLayout);
