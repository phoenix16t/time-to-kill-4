const initialState = {
  lat: null,
  lng: null
};

const reducers = function(state = initialState, action) {
  switch(action.type) {

    case 'ADD_LAT_LNG':
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng
      });

    case 'ADD_ADDRESS':
      return Object.assign({}, state, {
        address: action.address,
        zip: action.zip
      })
  }

  return state;
};

export default reducers;
