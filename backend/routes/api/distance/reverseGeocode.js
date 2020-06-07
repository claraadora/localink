const got = require('got');

const frontURI = 'https://maps.googleapis.com/maps/api/geocode/json?';
const APIkey = 'key=' + process.env.GM_API_KEY;

module.exports = async function reverseGeocode(lat, lng) {
  try {
    const URI = frontURI + 'latlng=' + lat + ',' + lng + '&' + APIkey;
    const response = await got(URI);
    const results = JSON.parse(response.body).results;
    const addresses = [];
    results.forEach(address => {
      address.formatted_address != 'Singapore'
        ? addresses.push(address.formatted_address)
        : null;
    });
    //return addresses;
    return addresses[0];
  } catch (error) {
    console.log(error.response.body);
  }
};
