const got = require("got");
const reverseGeocode = require("./geocode");

const URI =
  "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const geolocation = async () => {
  const { body } = await got.post(URI, {
    json: {
      homeMobileCountryCode: 525,
    },
    responseType: "json",
  });
  return body.location;
};

module.exports = geolocation;
