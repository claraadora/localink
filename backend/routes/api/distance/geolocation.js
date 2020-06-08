const got = require('got');
const reverseGeocode = require('./reverseGeocode');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?key=' +
  process.env.GOOGLE_MAPS_API_KEY;

const getCurrLocation = async () => {
  const { body } = await got.post(URI, {
    json: {
      homeMobileCountryCode: 525
    },
    responseType: 'json'
  });
  const location = body.location;
  const formatted_address = await reverseGeocode(location.lat, location.lng);
  return formatted_address;
};

module.exports = getCurrLocation;
