const got = require('got');

const frontURI = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const specificities = 'region=sg';
const APIkey = 'key=' + process.env.GOOGLE_MAPS_API_KEY;

module.exports = async function getDistance(start, end) {
  try {
    const origin = 'origins=' + start.lat + ',' + start.lng;
    const destination = 'destinations=' + end.lat + ',' + end.lng;
    const URI =
      frontURI +
      origin +
      '&' +
      destination +
      '&' +
      specificities +
      '&' +
      APIkey;
    const { body } = await got(URI);
    const distanceMatrix = JSON.parse(body);
    let dist = null;
    try {
      dist = distanceMatrix.rows[0].elements[0].distance.value;
    } catch (error) {
      dist = -1;
    }

    return dist;
  } catch (error) {
    console.log(error);
  }
};

//How to use
// const dist = await getDist(
//   await geocode('Pasir ris'),
//   await geocode('21 lower kent ridge road')
// );
