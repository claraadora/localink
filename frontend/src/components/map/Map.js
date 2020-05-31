import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import SearchPage from "../../pages/shopper/SearchPage";

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
    />
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function LocalinkMap() {
  return (
    <div style={{ width: "100vw", weight: "100vh" }}>
      <WrappedMap
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjucyjCeaC5ddig7Hd_RyzPrqWiBIwXhM&callback=initMap"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
