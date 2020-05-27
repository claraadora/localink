function initMap() {
  const startPoints = ['los angeles, ca', 'san bernardino, ca', 'barstow, ca'];
  const endPoints = ['san bernardino, ca', 'barstow, ca', 'winona, az'];
  //   const startPoints = ['los angeles, ca'];
  //   const endPoints = ['san bernardino'];
  const colors = ['#ff99ff', '#99c2ff', '#ff8080', '#ff8c1a'];

  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 }
  });

  let i;
  for (i = 0; i < startPoints.length; i++) {
    const directionsRenderer = new google.maps.DirectionsRenderer({
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
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      },
      function (response, status) {
        if (status === 'OK') {
          for (let i = 0; i < response.routes.length; i++) {
            new google.maps.DirectionsRenderer({
              polylineOptions: {
                strokeColor: colors[i % (colors.length - 1)]
              },
              map: map,
              directions: response,
              routeIndex: i
            });
          }
          //   var directionsDisplay = new google.maps.DirectionsRenderer({
          //     map: map
          //   });
          //   directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}
