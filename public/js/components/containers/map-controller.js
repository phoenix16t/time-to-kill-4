import React from 'react';

const MapController = React.createClass({
  render: function() {
    console.log("venueList", this.props.venueList)
    return (
      <div id="map"></div>
    );
  }
});

export default MapController;
