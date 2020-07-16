const got = require("got");
const reverseGeocode = require("./geocode");

const URI =
  "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
  process.env.GOOGLE_MAPS_API_KEY;

const geolocation = async () => {
  const { body } = await got.post(URI, {
    json: {
      homeMobileCountryCode: 525,
    },
    responseType: "json",
  });
  console.log("URI" + URI);
  console.log("URI" + URI);
  return body.location;
};

module.exports = geolocation;
