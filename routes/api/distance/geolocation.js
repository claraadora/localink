const got = require('got');
// const fetch = require('node-fetch');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?components=locality:singapore|country:SG&key=' +
  process.env.GOOGLE_MAPS_API_KEY;

const geolocation = async () => {
  // const header = {
  //   'Content-Type': 'application/json'
  // };
  //console.log(URI);
  const { body } = await got.post(URI, {
    json: {
      homeMobileCountryCode: 525,
      homeMobileNetwordCode: 02,
      considerIp: 'true'
    },
    responseType: 'json'
  });
  return body.location;
};

// const geolocation = async () => {
//   const body = {
//     homeMobileCountryCode: 525
//     // homeMobileNetwordCode: 2,
//     // considerIp: 'true'
//   };
//   console.log(URI);
//   const res = await fetch(URI, {
//     method: 'post',
//     body: body
//     // headers: { 'Content-Type': 'application/json' }
//   });
//   console.log('got res?');
//   console.log(res);
//   // const location = JSON.parse(res);
//   // console.log(JSON.parse(res));
//   return res;
// };

module.exports = geolocation;
