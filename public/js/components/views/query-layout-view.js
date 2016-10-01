import React from 'react';
import { Link } from 'react-router';

const QueryLayoutView = React.createClass({

  render: function() {
    return (
      <form>

        <div className="location">
          <p>The Place:</p>
          <select className="form-control">
            {this.props.venueTypes.map(function(type, i) {
              return (<option key={i}>{type}</option>);
            })}
          </select>
        </div>

        <div className="time">
          <p>The Time:</p>
          <select className="form-control">
            {this.props.times.map(function(time, i) {
              return (<option key={i}>{time}</option>);
            })}
          </select>
        </div>

        <Link to={`/kill-time`}><button type="button" className="btn btn-primary btn-lg btn-block">Kill Time</button></Link>
        
      </form>
    );
  }
});

export default QueryLayoutView;
