const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const frontURI = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
// origins=122C+Jalan+Pari+Burong&
// destinations=21+Lower+kent+ridge+road&
const specificities = 'region=sg';
const APIkey = 'key=AIzaSyBjucyjCeaC5ddig7Hd_RyzPrqWiBIwXhM';

function GetJSON(url) {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open('GET', url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function convertSpaceToPlus(string) {
  let stringArr = string.split(' ');
  let finalString = '';
  for (let i = 0; i < stringArr.length - 1; i++) {
    finalString = finalString + stringArr[i] + '+';
  }
  finalString += stringArr[stringArr.length - 1];
  return finalString;
}

module.exports = function getDistance(start, end) {
  const origin = 'origins=' + convertSpaceToPlus(start);
  const destination = 'destinations=' + convertSpaceToPlus(end);
  const URI =
    frontURI + origin + '&' + destination + '&' + specificities + '&' + APIkey;
  const distanceMatrix = JSON.parse(GetJSON(URI));
  return distanceMatrix.rows[0].elements[0].distance.value;
};

//How to use
// const getDist = require('./routes/api/distance');
// console.log(getDist('telok blangah blk 44', '21 lower kent ridge road'));
