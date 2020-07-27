const got = require("got");

const frontURI = "https://maps.googleapis.com/maps/api/geocode/json?";
const APIkey = "key=" + process.env.GOOGLE_MAPS_API_KEY;

module.exports = async function geocode(addr) {
  try {
    const address = "address=" + convertSpaceToPlus(addr);
    const URI = frontURI + address + "&" + APIkey;
    const response = await got(URI);
    const results = JSON.parse(response.body).results;

    // GET LAT LNG
    const latLng = results[0].geometry.location;
    let country = "";

    const arr = results[0].address_components;
    if (latLng !== "") {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].types[0] === "country") {
          country = country + arr[i].long_name;
          break;
        }
      }
    }
    return { latLng: latLng, country: country };
  } catch (error) {
    console.log(error);
  }
};

function convertSpaceToPlus(string) {
  let stringArr = string.split(" ");
  let finalString = "";
  for (let i = 0; i < stringArr.length - 1; i++) {
    if (stringArr[i].charAt(0) != "#") {
      finalString = finalString + stringArr[i] + "+";
    }
  }
  finalString += stringArr[stringArr.length - 1];
  return finalString;
}
