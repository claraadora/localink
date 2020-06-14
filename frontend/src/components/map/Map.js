import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
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

  useEffect(() => {
    if (!loading && productArray) {
      console.log("Search result is " + productArray);
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  const classes = useStyles();
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <GoogleMap
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
    </GoogleMap>
  );
}
