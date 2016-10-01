export function addLatLng(lat, lng) {
  return {
    type: 'ADD_LAT_LNG',
    lat,
    lng
  }
}

export function addAddress(address, zip) {
  return {
    type: 'ADD_ADDRESS',
    address,
    zip
  }
}