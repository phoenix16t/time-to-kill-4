import React from 'react';

const ArrowController = React.createClass({
  render: function() {
    return (
      <div className="arrows">
        <div className="arrow left">{'<'}</div>
        <div className="arrow right">{'>'}</div>
      </div>
    );
  }
})

export default ArrowController;
