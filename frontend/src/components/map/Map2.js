import React, { useState, useEffect, useRef } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
  InfoWindow,
} from "react-google-maps";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import {
  purple,
  pink,
  cyan,
  deepPurple,
  orange,
  indigo,
  lime,
  teal,
} from "@material-ui/core/colors";

function createKey(location) {
  return location.lat + location.lng;
}

const colors = [pink, cyan, deepPurple, orange, indigo, lime, purple, teal];

function Map() {
  const searchResult = useSelector((state) => state.search.productArray);
  const loading = useSelector((state) => state.search.loading);
  const stops = useSelector((state) => state.itinerary.itineraryArray);
  const [startPoints, setStartPoints] = useState([]);
  const [endPoints, setEndPoints] = useState([]);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [routeData, setRouteData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();
  const selectedPolyline = useRef();
  const renderRoute = useSelector((state) => state.search.renderRoute);

  const onClick = () => {
    console.log("CLICKED" + selectedPolyline.current);
  };

  useEffect(() => {
    const latLng = stops.map((product) => product.shop_docs[0].latLng);
    const newStart = latLng.slice(0, latLng.length - 1);
    const newEnd = latLng.slice(1, latLng.length);
    setStartPoints(newStart);
    setEndPoints(newEnd);
    setMarkers(latLng);
  }, [stops, setStartPoints, setEndPoints, setMarkers]);

  useEffect(() => {});

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();
    let tempArr = [];

    console.log("here");
    console.log(startPoints.length);
    for (let i = 0; i < startPoints.length; i++) {
      DirectionsService.route(
        {
          origin: startPoints[i],
          destination: endPoints[i],
          travelMode: travelMode,
          provideRouteAlternatives: true,
        },
        (response, status) => {
          if (status === "OK") {
            let routes = [];
            tempArr.push(response);
            for (let j = 0; j < response.routes.length; j++) {
              routes.push({
                distance: response.routes[j].legs[0].distance,
                duration: response.routes[j].legs[0].duration,
                fare: response.routes[j].fare,
                end_address: response.routes[j].legs[0].end_address,
                start_address: response.routes[j].legs[0].start_address,
                routeIndex: j,
              });
            }
            routeData.push(routes);
            console.log("temp" + tempArr.length);
            console.log("start" + startPoints.length);
            if (tempArr.length === startPoints.length) {
              setDirections(tempArr);
            }

            if (routeData.length === startPoints.length) {
              setRouteData(routeData);
            }
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
      );
    }
  }, [
    setDirections,
    setRouteData,
    setStartPoints,
    setEndPoints,
    stops,
    startPoints,
    endPoints,
  ]);

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

  const onMouseOver = (e) => {
    console.log("clicked");
  };
  function writeDirectionsSteps(data) {
    const steps = data.steps;
    const start_address = data.start_address;
    const end_address = data.end_address;
    const start_location = data.start_location;
    const end_location = data.end_location;

    var overlayContent = document.getElementById("right-panel");
    overlayContent.innerHTML = "";

    overlayContent.innerHTML +=
      `<h2> From A: </h2>` +
      start_address +
      "<hr>" +
      `<h2> To B: </h2>` +
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
  }
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
      gestureHandling="cooperative"
      ref={mapRef}
    >
      {!renderRoute && searchResult.length > 0
        ? searchResult.map((product, index) => {
            return (
              <Marker
                key={createKey(product.shop_docs[0].latLng)}
                position={product.shop_docs[0].latLng}
              />
            );
          })
        : null}
      {renderRoute && stops.length > 0 && directions.length > 0
        ? directions.map((direction, idx) => {
            console.log("mapping");
            return direction.routes.map((route, index) => {
              return (
                <Polyline
                  path={direction.routes[index].overview_path}
                  options={{
                    strokeColor: colors[idx][index === 0 ? 400 : 200],
                    strokeWeight: 6,
                    zIndex: 1,
                    clickable: true,
                  }}
                  onClick={(e) => onMouseOver(direction.routes[index].legs[0])}
                />
              );
            });
          })
        : null}
      {renderRoute && stops.length > 0 && markers.length > 0
        ? markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                position={marker}
                label={String.fromCharCode(65 + index)}
              />
            );
          })
        : null}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export const LocalinkMap = () => {
  return (
    <div style={{ width: "100vw", height: "92vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
