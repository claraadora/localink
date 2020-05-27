function initMap() {
  //   var startPoints = ['los angeles, ca', 'san bernardino, ca', 'barstow, ca'];
  //   var endPoints = ['san bernardino, ca', 'barstow, ca', 'winona, az'];
  var startPoints = ['los angeles, ca'];
  var endPoints = ['san bernardino'];

  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 }
  });

  var i;
  for (i = 0; i < startPoints.length; i++) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
      map: map
    });
    calculateAndDisplayRoute(directionsService, directionsRenderer, i);
  }

  // var onChangeHandler = function () {
  //   calculateAndDisplayRoute(directionsService, directionsRenderer);
  // };
  //     document
  //       .getElementById('start')
  //       .addEventListener('change', onChangeHandler);
  //     document
  //       .getElementById('end')
  //       .addEventListener('change', onChangeHandler);
  //   }

  function calculateAndDisplayRoute(directionsService, directionsRenderer, i) {
    directionsService.route(
      {
        origin: { query: startPoints[i] },
        destination: { query: endPoints[i] },
        travelMode: 'TRANSIT',
        provideRouteAlternatives: true
      },
      function (response, status) {
        if (status === 'OK') {
          var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
          });
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}
