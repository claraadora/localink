const got = require('got');
const reverseGeocode = require('./reverseGeocode');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?key=' +
<<<<<<< HEAD
  process.env.GOOGLE_MAPS_API_KEY;
=======
  process.env.GM_API_KEY;
>>>>>>> 6155f825c1e4f63a04c431633a738ff1d02f945a

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
<<<<<<< HEAD
=======

//HOW TO USE
// const getCurrentLoc = require('./routes/api/distance/geolocation');
// console.log('currloc ' + await getCurrentLoc());
>>>>>>> 6155f825c1e4f63a04c431633a738ff1d02f945a
