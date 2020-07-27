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
  updateStops,
  updateDirectionSteps,
} from "../../actions/shopper/searchActions";
import pin from "../../utils/pin.png";

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
  const [markerKeys, setMarkerKeys] = useState([]);

  // Route
  const itineraryStops = itinerarySelector.itineraryArray;
  const [stops, setStops] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState(searchSelector.travelMode);
  const renderRoute = useSelector((state) => state.search.renderRoute);

  // Refs
  const mapRef = useRef();
  const selectedPolyline = useRef();

  useEffect(() => {
    setMarkerKeys([]);
  }, [products]);
  useEffect(() => {
    const latLng = itineraryStops.map((product) => product.shop_docs[0].latLng);
    if (userLocation !== null) {
      latLng.unshift(userLocation);
    }
    setStops(latLng);
    dispatch(updateStops(latLng));

    if (latLng.length > 2) {
      const temp = [];
      latLng.map((stop, index) => {
        if (index !== 0 && index !== latLng.length - 1) {
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
            dispatch(loadDirectionSteps(response.routes[0]));
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
      );
    }
  }, [stops, waypoints, travelMode]);

  // useEffect(() => {
  //   if (renderRoute) {
  //     console.log(directions.routes[0].legs[0]);
  //     dispatch(loadDirectionSteps(directions.routes[0].legs[0]));
  //   }
  // }, [renderRoute, directions, travelMode]);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
      gestureHandling="cooperative"
      defaultOptions={{ disableDefaultUI: true }}
      ref={mapRef}
    >
      {/**RENDER USER CURRENT LOCATION */}
      {!renderRoute && userLocation !== null && (
        <Marker
          key="userlocation"
          position={userLocation}
          icon={{
            url: pin,
          }}
        />
      )}
      {/**RENDER ALL PRODUCT MARKERS*/}
      {!renderRoute &&
        products.length > 0 &&
        products.map((product, index) => {
          return <Marker key={index} position={product.shop_docs[0].latLng} />;
        })}
      {/**RENDER ROUTE*/}
      {renderRoute && stops.length > 1 && directions && (
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
      {console.log("key" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY)}
    </div>
  );
};
