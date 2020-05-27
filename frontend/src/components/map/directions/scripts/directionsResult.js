function initMap() {
  const startPoints = ['los angeles, ca', 'san bernardino, ca', 'barstow, ca'];
  const endPoints = ['san bernardino, ca', 'barstow, ca', 'winona, az'];

  const colors = ['#ff99ff', '#99c2ff', '#ff8080', '#ff8c1a'];

  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 }
  });
  let routeData = [];

  for (let i = 0; i < startPoints.length; i++) {
    calculateAndDisplayRoute(directionsService, i);
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

  function calculateAndDisplayRoute(directionsService, i) {
    directionsService.route(
      //create DirectionsRequest object
      {
        origin: { query: startPoints[i] },
        destination: { query: endPoints[i] },
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      },
      function (response, status) {
        if (status === 'OK') {
          for (let i = 0; i < response.routes.length; i++) {
            const polyline = createPolyline(i);

            new google.maps.DirectionsRenderer({
              polylineOptions: polyline,
              map: map,
              directions: response,
              routeIndex: i
            });

            routeData.push({
              distance: response.routes[i].legs[0].distance,
              duration: response.routes[i].legs[0].duration,
              fare: response.routes[i].fare,
              end_address: response.routes[i].legs[0].end_address,
              start_address: response.routes[i].legs[0].start_address,
              routeIndex: i
            });
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  function createPolyline(i) {
    const polyline = new google.maps.Polyline({
      strokeColor: colors[i % (colors.length - 1)],
      strokeWeight: 5,
      zIndex: 1
    }); //maybe need to save and set map of polyline

    polyline.setMap(map);

    const infowindow = new google.maps.InfoWindow({});

    google.maps.event.addListener(polyline, 'mouseover', function () {
      polyline.setOptions({
        strokeWeight: 8,
        zIndex: 2
      });
      infowindow.setContent('hello');
      //infowindow.setPosition(midLatLng);
      infowindow.open(map);
    });

    google.maps.event.addListener(polyline, 'mouseout', function () {
      polyline.setOptions({
        strokeWeight: 5,
        zIndex: 0
      });
      infowindow.close();
    });

    return polyline;
  }
}
