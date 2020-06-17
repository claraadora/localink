import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

function createKey(location) {
  return location.lat + location.lng;
}

const useStyles = makeStyles((theme) => ({
  infoWindow: {
    width: "30px",
    height: "40px",
  },
}));

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
// const directionsService = new window.google.maps.DirectionsService();
export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const productArray = useSelector((state) => state.search.productArray);
  const loading = useSelector((state) => state.search.loading);
  const [searchResult, setSearchResult] = useState(null);

  // Directions Renderer
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState({ lat: 1.30655, lng: 103.773523 });
  const [waypoints, setWaypoints] = useState([
    { location: { lat: 1.31655, lng: 103.773523 }, stopover: true },
    { location: { lat: 1.32655, lng: 103.773523 }, stopover: true },
  ]);
  const [destination, setDestination] = useState({
    lat: 1.308086,
    lng: 103.773538,
  });
  const [travelMode, setTravelMode] = useState("DRIVING");

  useEffect(() => {
    if (!loading && productArray) {
      console.log("Search result is " + productArray);
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  const directionsCallback = (response) => {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
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
        : searchResult.map((product) => {
            return (
              <Marker
                key={createKey(product.shop_docs[0].latLng)}
                position={product.shop_docs[0].latLng}
              />
            );
          })}
      {destination !== "" && origin !== "" && (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            waypoints: waypoints,
            travelMode: travelMode,
          }}
          callback={directionsCallback}
        />
      )}

      {response !== null && (
        <DirectionsRenderer
          options={{
            directions: response,
          }}
        />
      )}
    </GoogleMap>
  );
}
