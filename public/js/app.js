import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import { Provider } from 'react-redux';
// import QueryHandler from './layouts/query-handler';
// import VenueHandler from './layouts/venue-handler';
import store from './store';

ReactDOM.render(
  <Provider store={store}><AppRouter /></Provider>,
  document.querySelector('.root')
);
