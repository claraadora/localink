const got = require('got');

const frontURI = 'https://maps.googleapis.com/maps/api/geocode/json?';
const APIkey = 'key=' + process.env.GOOGLE_MAPS_API_KEY;

module.exports = async function geocode(addr) {
  try {
    const address = 'address=' + convertSpaceToPlus(addr);
    const URI = frontURI + address + '&' + APIkey;
    const response = await got(URI);
    const results = JSON.parse(response.body).results;
    const latLng = results[0].geometry.location;
    return latLng;
  } catch (error) {
    console.log(error.response.body);
  }
};

function convertSpaceToPlus(string) {
  let stringArr = string.split(' ');
  let finalString = '';
  for (let i = 0; i < stringArr.length - 1; i++) {
    finalString = finalString + stringArr[i] + '+';
  }
  finalString += stringArr[stringArr.length - 1];
  return finalString;
}
