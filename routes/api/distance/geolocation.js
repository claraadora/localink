const got = require('got');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?key=' +
  process.env.GOOGLE_MAPS_API_KEY;

const geolocation = async () => {
  const header = {
    'Content-Type': 'application/json'
  };
  console.log(URI);
  const { body } = await got.post(URI, {
    json: {
      homeMobileCountryCode: 65
    },
    responseType: 'json'
  });
  return body.location;
};

module.exports = geolocation;
