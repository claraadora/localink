const got = require('got');

const frontURI = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const specificities = 'region=sg';
const APIkey = 'key=' + process.env.GOOGLE_MAPS_API_KEY;

function convertSpaceToPlus(string) {
  let stringArr = string.split(' ');
  let finalString = '';
  for (let i = 0; i < stringArr.length - 1; i++) {
    finalString = finalString + stringArr[i] + '+';
  }
  finalString += stringArr[stringArr.length - 1];
  return finalString;
}

module.exports = async function getDistance(start, end) {
  const origin = 'origins=' + convertSpaceToPlus(start);
  const destination = 'destinations=' + convertSpaceToPlus(end);
  const URI =
    frontURI + origin + '&' + destination + '&' + specificities + '&' + APIkey;
  const { body } = await got(URI);
  const distanceMatrix = JSON.parse(body);
  return distanceMatrix.rows[0].elements[0].distance.value;
};

//How to use
// const getDist = require('./distance');
// const dist = await getDist(
//   'telok blangah blk 44',
//   '21 lower kent ridge road'
// );
