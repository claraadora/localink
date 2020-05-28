function initMap() {
  //   const startPoints = ['los angeles, ca', 'san bernardino, ca', 'barstow, ca'];
  //   const endPoints = ['san bernardino, ca', 'barstow, ca', 'winona, az'];
  const startPoints = ['los angeles, ca', 'san bernardino, ca'];
  const endPoints = ['san bernardino, ca', 'barstow, ca'];

  const colors = ['#ff99ff', '#99c2ff', '#ff8080', '#ff8c1a'];

  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 }
  });
  let routeData = []; //nested array contains multiple routes between 2 locations
  let start = 0; //keep track of nested array

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
          let routes = [];
          routeData.push(routes);
          for (let i = 0; i < response.routes.length; i++) {
            routeData[start].push({
              // response is a set of directions between the
              // two points along roads.
              //The distance is the distance you would have to drive.
              distance: response.routes[i].legs[0].distance,
              duration: response.routes[i].legs[0].duration,
              fare: response.routes[i].fare,
              end_address: response.routes[i].legs[0].end_address,
              start_address: response.routes[i].legs[0].start_address,
              routeIndex: start
            });

            const polyline = createPolyline(start, i);
            console.log(response);
            const directionsRenderer = new google.maps.DirectionsRenderer({
              polylineOptions: polyline,
              map: map,
              directions: response,
              routeIndex: i
            });
            setTextDirections(polyline, directionsRenderer);
          }
          start++;
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  function createPolyline(start, i) {
    const polyline = new google.maps.Polyline({
      //   path: response.routes[i].overview_path,
      strokeColor: colors[i % (colors.length - 1)],
      strokeWeight: 5,
      zIndex: 1
      //   tag: {
      //     index: start,
      //     nestedIndex: i
      //   }
    });

    polyline.setMap(map);

    const infowindow = new google.maps.InfoWindow({});
    infowindow.setContent(formatRouteData(routeData[start][i]));

    google.maps.event.addListener(polyline, 'mouseover', function (event) {
      polyline.setOptions({
        strokeWeight: 8,
        zIndex: 2
      });
      infowindow.setPosition(event.latLng);
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

  function formatRouteData(data) {
    const fare = data.fare ? data.fare : 'cannot be calculated';
    return (
      'distance: ' +
      data.distance.text +
      '<br> duration: ' +
      data.duration.text +
      '<br> fare: ' +
      fare
    );
  }

  function setTextDirections(polyline, directionsRenderer) {
    google.maps.event.addListener(polyline, 'click', function () {
      //clear previous panel
      document.getElementById('right-panel').innerHTML = '';
      directionsRenderer.setPanel(document.getElementById('right-panel'));
      //   var control = document.getElementById('floating-panel');
      //   control.style.display = 'block';
      //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    });
  }
}
