const request = require('request');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBjucyjCeaC5ddig7Hd_RyzPrqWiBIwXhM';

const JSONbody = {
  homeMobileCountryCode: 525
};

request(
  {
    url: URI,
    method: 'POST',
    json: true,
    body: JSONbody
  },
  function (error, response, body) {
    return response.body.location;
  }
);
