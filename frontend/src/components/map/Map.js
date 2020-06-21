import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import {
  pink,
  deepPurple,
  indigo,
  cyan,
  teal,
  lime,
  orange,
  amber,
} from "@material-ui/core/colors";
import greenDot from "../../assets/smallgreendotmarker.png";

function createKey(location) {
  return location.lat + location.lng;
}

const libraries = ["places"];
const mapContainerStyles = {
  height: "100%",
};
const center = {
  lat: 1.3521,
  lng: 103.8198,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const colors = [
  pink[300],
  deepPurple[300],
  indigo[300],
  cyan[300],
  teal[300],
  lime[300],
  amber[300],
  orange[300],
];

const A = { lat: 1.30655, lng: 103.773523 };
const B = { lat: 1.31655, lng: 103.773523 };
const C = { lat: 1.32655, lng: 103.773523 };
const D = { lat: 1.308086, lng: 103.773538 };

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const productArray = useSelector((state) => state.search.productArray);
  const loading = useSelector((state) => state.search.loading);
  const [searchResult, setSearchResult] = useState(null);

  // User's states
  const [startPoints, setStartPoints] = useState([A]);
  const [endPoints, setEndPoints] = useState([B]);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [isMouseOver, setIsMouseOver] = useState(false);

  //Google Map API States
  const [routeData, setRouteData] = useState([]); //array of responses

  useEffect(() => {
    if (!loading && productArray) {
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        // let routes = [];
        // console.log("lenght" + response.routes.length);
        // for (let i = 0; i < response.routes.length; i++) {
        //   routes.push({
        //     distance: response.routes[i].legs[0].distance,
        //     duration: response.routes[i].legs[0].duration,
        //     fare: response.routes[i].fare,
        //     end_address: response.routes[i].legs[0].end_address,
        //     start_address: response.routes[i].legs[0].start_address,
        //     routeIndex: i,
        //   });
        // }
        setRouteData(() => [...routeData, [response]]);
      } else {
        window.alert("Directions request failed due to " + response.status);
      }
    }
  };

  const createPolyline = (start, i) => {
    return (
      <Polyline
        options={{
          strokeColor: colors[i % (colors.length - 1)],
          strokeWeight: isMouseOver ? 8 : 5,
          zIndex: isMouseOver ? 2 : 0,
          tag: {
            index: start,
            nestedIndex: i,
          },
        }}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => setIsMouseOver(false)}
      />
    );
  };

  return (
    <GoogleMap
      id="direction-example"
      mapContainerStyle={mapContainerStyles}
      zoom={12}
      center={center}
      options={options}
    >
      {searchResult == null
        ? null
        : searchResult.map((product, index) => {
            return (
              <Marker
                key={createKey(product.shop_docs[0].latLng)}
                position={product.shop_docs[0].latLng}
              />
            );
          })}

      {startPoints !== [] &&
        endPoints !== [] &&
        startPoints.map((startPoint, index) => (
          <DirectionsService
            options={{
              destination: endPoints[index],
              origin: startPoint,
              provideRouteAlternatives: false,
              travelMode: travelMode,
            }}
            callback={directionsCallback}
          />
        ))}
      {console.log("route data" + routeData)}

      {routeData !== [] &&
        routeData.map((routesBetweenTwoStops, index) => {
          let nthStop = index;
          routesBetweenTwoStops.map((route, index) => (
            <DirectionsRenderer
              options={{
                directions: routesBetweenTwoStops,
                routeIndex: index,
                polylineOptions: createPolyline(nthStop, index),
              }}
            />
          ));
        })}
    </GoogleMap>
  );
}
