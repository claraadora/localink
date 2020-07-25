const URI =
  'https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelMode=driving&';
const startLocation = 'origin=1.3278183,103.9350129';
const endLocation = 'destination=1.2950065,103.7777133';
const middle = 'waypoints=1.2968981,103.8745322|1.3028396,103.8753794';

const finalURI = URI + startLocation + endLocation + middle;

//send post request to
