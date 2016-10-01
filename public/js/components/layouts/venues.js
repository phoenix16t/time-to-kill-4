import React from 'react';
import { Link } from 'react-router';
import MapCtrl from '../containers/map-controller';
import ArrowCtrl from '../containers/arrow-controller';
import TilesCtrl from '../containers/tiles-controller';

const venueList = require('../../../../hidden/data.txt').server_data;

const Venues = React.createClass({
  render: function() {
    return (
      <div className="results container">
        <Link to={`/`}><div className="back">{'<'}</div></Link>

        <MapCtrl venueList={venueList} />

        <ArrowCtrl />

        <TilesCtrl />
      </div>
    );
  }
});

export default Venues;
