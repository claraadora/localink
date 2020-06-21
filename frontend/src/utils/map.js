function calculateAndDisplayRoute(directionsService, i) {
  directionsService.route(
    //create DirectionsRequest object
    {
      origin: { query: startPoints[i] },
      destination: { query: endPoints[i] },
      travelMode: "DRIVING",
      provideRouteAlternatives: true,
    },
    function (response, status) {
      if (status === "OK") {
        let routes = [];
        routeData.push(routes);
        for (let i = 0; i < response.routes.length; i++) {
          routeData[start].push({
            distance: response.routes[i].legs[0].distance,
            duration: response.routes[i].legs[0].duration,
            fare: response.routes[i].fare,
            end_address: response.routes[i].legs[0].end_address,
            start_address: response.routes[i].legs[0].start_address,
            routeIndex: i,
          });

          const polyline = createPolyline(start, i);
          console.log(response);

          const directionsRenderer = new google.maps.DirectionsRenderer({
            polylineOptions: polyline,
            suppressMarkers: true,
            map: map,
            directions: response,
            routeIndex: i,
          });

          position = response.routes[0].legs[0];

          setTextDirections(polyline, directionsRenderer);
        }

        if (start === 0) {
          createMarker(position.start_location, start);
        }

        start++;

        createMarker(position.end_location, start);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function createMarker(latLng, i) {
  new google.maps.Marker({
    position: latLng,
    map: map,
    label: markerLabels[i],
  });
}

function createPolyline(start, i) {
  const polyline = new google.maps.Polyline({
    //   path: response.routes[i].overview_path,
    strokeColor: colors[i % (colors.length - 1)],
    strokeWeight: 5,
    zIndex: 1,
    tag: {
      index: start,
      nestedIndex: i,
    },
  });

  polyline.setMap(map);

  const infowindow = new google.maps.InfoWindow({});
  infowindow.setContent(formatRouteData(routeData[start][i]));

  google.maps.event.addListener(polyline, "mouseover", function (event) {
    polyline.setOptions({
      strokeWeight: 8,
      zIndex: 2,
    });
    infowindow.setPosition(event.latLng);
    infowindow.open(map);
  });

  google.maps.event.addListener(polyline, "mouseout", function () {
    polyline.setOptions({
      strokeWeight: 5,
      zIndex: 0,
    });
    infowindow.close();
  });

  return polyline;
}

function formatRouteData(data) {
  console.log(data);
  const fare = data.fare ? data.fare.text : "not available";
  return (
    "distance: " +
    data.distance.text +
    "<br> duration: " +
    data.duration.text +
    "<br> fare: " +
    fare +
    "<br> start: " +
    data.start_address +
    "<br> end: " +
    data.end_address +
    '<br> <a href="">Select</a>'
  );
}

function setTextDirections(polyline, directionsRenderer) {
  console.log("std");
  google.maps.event.addListener(polyline, "click", function () {
    //clear previous panel
    document.getElementById("right-panel").innerHTML = "";
    directionsRenderer.setPanel(document.getElementById("right-panel"));
    //   var control = document.getElementById('floating-panel');
    //   control.style.display = 'block';
    //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  });
}
