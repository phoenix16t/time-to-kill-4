import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import QueryLayout from './components/containers/query-layout';
import Venues from './components/layouts/venues';

const AppRouter = React.createClass({
  render: function() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={QueryLayout} />
        <Route path='/kill-time' component={Venues} />
      </Router>
    )
  }
});

export default AppRouter;
