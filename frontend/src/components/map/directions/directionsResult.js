function initMap() {
  //[ubi, aljunied, kallang]
  const inputAddresses = [
    { lat: 1.3287683, lng: 103.8963967 },
    {
      lat: 1.3263764,
      lng: 103.8795565,
    },
    {
      lat: 1.3088789,
      lng: 103.865919,
    },
  ];

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const labelledAddresses = labelAddress(inputAddresses);

  function labelAddress(addresses) {
    const labelledAddresses = [];
    let i = 0;
    addresses.forEach((address) => {
      const labelled = {
        address: address,
        label: labels.charAt(i),
      };
      i++;
      labelledAddresses.push(labelled);
    });
    return labelledAddresses;
  }

  const startPoints = getStartPoints(inputAddresses); //[ubi, aljunied]
  const endPoints = getEndPoints(inputAddresses); //[aljunied, kallang]

  function getStartPoints(addresses) {
    const copy = [...addresses];
    copy.pop();
    return copy;
  }

  function getEndPoints(addresses) {
    const copy = [...addresses];
    copy.shift();
    return copy;
  }

  const colors = ["#ff99ff", "#99c2ff", "#ff8080", "#ff8c1a"];

  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 },
    gestureHandling: "cooperative",
  });
  let routeData = []; //nested array contains multiple routes between 2 locations
  let start = 0; //keep track of nested array
  let position = null; //start and end position of a route

  for (let i = 0; i < startPoints.length; i++) {
    calculateAndDisplayRoute(directionsService, i);
  }

  function calculateAndDisplayRoute(directionsService, i) {
    directionsService.route(
      //create DirectionsRequest object
      {
        origin: startPoints[i],
        destination: endPoints[i],
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      },
      function (response, status) {
        if (status === "OK") {
          let routes = [];
          routeData.push(routes);
          for (let i = 0; i < response.routes.length; i++) {
            //for (let i = 0; i < 1; i++) {
            routeData[start].push({
              summary: response.routes[i].summary,
              distance: response.routes[i].legs[0].distance,
              duration: response.routes[i].legs[0].duration,
              fare: response.routes[i].fare,
              end_address: response.routes[i].legs[0].end_address,
              start_address: response.routes[i].legs[0].start_address,
              routeIndex: i,
            });

            const polyline = createPolyline(start, i);
            console.log("resp is: ");
            console.log(response);
            const directionsRenderer = new google.maps.DirectionsRenderer({
              polylineOptions: polyline,
              suppressMarkers: true,
              map: map,
              directions: response,
              routeIndex: i,
              hideRouteList: true,
            });

            //setTextDirections(polyline, directionsRenderer, response);
            writeDirectionsSteps(polyline, response.routes[i].legs[0]);
          }

          position = response.routes[0].legs[0];
          if (start === 0) {
            console.log("only once");
            console.log(position);
            createMarker(position.start_location, start);
          }

          start++;

          console.log("start: " + start);
          createMarker(position.end_location, start);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  function writeDirectionsSteps(polyline, data) {
    const steps = data.steps;
    const start_address = data.start_address;
    const end_address = data.end_address;
    const start_location = data.start_location;
    const end_location = data.end_location;

    const start_label = labelledAddresses.find(function (element) {
      return (
        truncate(element.address.lat) == truncate(start_location.lat()) &&
        truncate(element.address.lng) == truncate(start_location.lng())
      );
    }).label;

    const end_label = labelledAddresses.find(function (element) {
      return (
        truncate(element.address.lat) == truncate(end_location.lat()) &&
        truncate(element.address.lng) == truncate(end_location.lng())
      );
    }).label;

    google.maps.event.addListener(polyline, "click", function () {
      var overlayContent = document.getElementById("right-panel");
      overlayContent.innerHTML = "";

      overlayContent.innerHTML +=
        `<h2> From ${start_label}: </h2>` +
        start_address +
        "<hr>" +
        `<h2> To ${end_label}: </h2>` +
        end_address +
        "</h2> <hr>";

      for (var i = 0; i < steps.length; i++) {
        const count = i + 1;
        overlayContent.innerHTML +=
          "<p>" +
          +count +
          ". " +
          steps[i].instructions +
          "</p><small>" +
          steps[i].distance.text +
          "</small>" +
          "<hr>";
      }

      // overlayContent.innerHTML +=
      //   '<h1>' + end_label + '</h1>' + '<h1>' + end_address + '</h1>';
    });
  }

  function truncate(num) {
    truncateDecimals = function (number) {
      return Math[number < 0 ? "ceil" : "floor"](number);
    };
    return truncateDecimals(num * 1000) / 1000;
  }

  function createMarker(latLng, i) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      label: labels[i],
    });

    const infowindow = new google.maps.InfoWindow({});

    if (i === inputAddresses.length - 1) {
      google.maps.event.addListener(
        marker,
        "mouseover",
        (function (marker, i) {
          return function () {
            infowindow.setContent(routeData[i - 1][0].end_address);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    } else {
      google.maps.event.addListener(
        marker,
        "mouseover",
        (function (marker, i) {
          return function () {
            infowindow.setContent(routeData[i][0].start_address);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }

    google.maps.event.addListener(
      marker,
      "mouseout",
      (function () {
        return function () {
          infowindow.close();
        };
      })()
    );
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
    const fare = data.fare ? data.fare.text : "not available";
    return (
      "route: " +
      data.summary +
      "<br> distance: " +
      data.distance.text +
      "<br> duration: " +
      data.duration.text +
      "<br> fare: " +
      fare
    );
  }
}
{
  directions !== []
    ? directions.map((direction, idx) => {
        direction.routes.map((route, index) => {
          return (
            <DirectionsRenderer
              directions={direction}
              routeIndex={index}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: colors[idx][index === 0 ? A400 : A100],
                  strokeWeight: 5,
                  zIndex: 1,
                },
              }}
            />
          );
        });
      })
    : null;
}
