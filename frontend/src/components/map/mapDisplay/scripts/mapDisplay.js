//send post request with "search": [user input]
//get back JSON object {shop: product}, lets call this searchResult

function initMap() {
  const locations = [
    [
      'Bondi Beach<br>\
    801 S Hope St A, Los Angeles, CA 90017<br>\
   <a href="">Select</a>',
      -33.890542,
      151.274856,
      4
    ],
    [
      'Coogee Beach<br>\
    525 Santa Monica Blvd, Santa Monica, CA 90401<br>\
   <a href="">Select</a>',
      -33.923036,
      151.259052,
      5
    ],
    [
      'Cronulla Beach<br>\
    146 South Lake Avenue #106, At Shoppers Lane, Pasadena, CA 91101<br>\
    <a href="">Select</a>',
      -34.028249,
      151.157507,
      3
    ],
    [
      'Manly Beach<br>\
    21016 Pacific Coast Hwy, Huntington Beach, CA 92648<br>\
    <a href="">Select</a>',
      -33.80010128657071,
      151.28747820854187,
      2
    ],
    [
      'Maroubra Beach<br>\
    252 S Brand Blvd, Glendale, CA 91204<br>\
   <a href="">Select</a>',
      -33.950198,
      151.259302,
      1
    ]
  ];

  //   var center = { lat: 1.3521, lng: 103.8198 };
  const center = { lat: -33.92, lng: 151.25 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 10 //12
  });

  const infowindow = new google.maps.InfoWindow({});

  let marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(
      marker,
      'mouseover',
      (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]); //set store info here
          infowindow.open(map, marker);
        };
      })(marker, i)
    );

    google.maps.event.addListener(
      marker,
      'mouseout',
      (function (marker, i) {
        return function () {
          infowindow.close();
        };
      })(marker, i)
    );
  }
}
