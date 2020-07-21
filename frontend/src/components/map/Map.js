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
import { useSelector, useDispatch } from "react-redux";
import { teal } from "@material-ui/core/colors";
import {
  loadDirectionSteps,
  updateDirectionSteps,
} from "../../actions/shopper/searchActions";

function createKey(location) {
  return location.lat + location.lng;
}

function Map() {
  const searchSelector = useSelector((state) => state.search);
  const itinerarySelector = useSelector((state) => state.itinerary);
  const dispatch = useDispatch();

  // Marker
  const products = searchSelector.productArray;
  const userLocation = searchSelector.userLocation;
  const [markers, setMarkers] = useState([]);

  // Route
  const itineraryStops = itinerarySelector.itineraryArray;
  const [stops, setStops] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const renderRoute = useSelector((state) => state.search.renderRoute);

  // Refs
  const mapRef = useRef();
  const selectedPolyline = useRef();

  const onClick = () => {
    console.log("CLICKED" + selectedPolyline.current);
  };

  useEffect(() => {
    const latLng = itineraryStops.map((product) => product.shop_docs[0].latLng);
    if (userLocation !== null) {
      latLng.push(userLocation);
    }

    setStops(latLng);
    console.log(latLng.length + "length");

    if (latLng.length > 2) {
      const temp = [];
      latLng.map((stop, index) => {
        if (index !== 0 && index !== stops.length - 1) {
          temp.push({
            location: stop,
            stopover: true,
          });
        }
      });
      setWaypoints(temp);
    }
  }, [itineraryStops, userLocation]);

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();

    if (stops && stops.length > 1) {
      const len = stops.length;
      DirectionsService.route(
        {
          origin: stops[0],
          destination: stops[len - 1],
          waypoints: waypoints,
          travelMode: travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
            console.log(directions);
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
      );
    }
  }, [stops, renderRoute, travelMode]);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
      gestureHandling="cooperative"
      defaultOptions={{ disableDefaultUI: true }}
      ref={mapRef}
    >
      {/**RENDER ALL PRODUCT MARKERS*/}
      {!renderRoute &&
        products.length > 0 &&
        products.map((product) => {
          return (
            <Marker
              key={createKey(product.shop_docs[0].latLng)}
              position={product.shop_docs[0].latLng}
            />
          );
        })}
      {/**RENDER ROUTE*/}
      {renderRoute && stops && directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export const LocalinkMap = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
