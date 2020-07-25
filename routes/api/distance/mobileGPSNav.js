const URI =
  'https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelMode=driving&';
const startLocation = 'origin=1.3278183,103.9350129'; //lat,lng of start
const endLocation = 'destination=1.2950065,103.7777133'; //lat, lng of end point
const middle = 'waypoints=1.2968981,103.8745322|1.3028396,103.8753794'; //all the middle places

const finalURI = URI + startLocation + endLocation + middle;

//send post request to /final-route
//with header Content-Type = application/json
//and shopper's token
//body: {
//     "uri": "https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelMode=transit&origin=1.3278183,103.9350129&destination=1.2950065,103.7777133&waypoints=1.2968981,103.8745322|1.3028396,103.8753794"
//      }
