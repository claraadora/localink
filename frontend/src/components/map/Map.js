// import React, { useState, useEffect, useRef } from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   Polyline,
//   InfoWindow,
// } from "react-google-maps";
// import { makeStyles } from "@material-ui/styles";
// import { useSelector, useDispatch } from "react-redux";
// import { teal } from "@material-ui/core/colors";
// import {
//   loadDirectionSteps,
//   updateDirectionSteps,
// } from "../../actions/shopper/searchActions";

// function createKey(location) {
//   return location.lat + location.lng;
// }

// const colors = [pink, cyan, deepPurple, orange, indigo, lime, purple, teal];

// function Map() {
//   const productArray = useSelector((state) => state.search.productArray);
//   const searchSelector = useSelector((state) => state.search);
//   const [userLocation, setUserLocation] = useState(searchSelector.userLocation);
//   const stops = useSelector((state) => state.itinerary.itineraryArray);
//   const [startPoints, setStartPoints] = useState([]);
//   const [endPoints, setEndPoints] = useState([]);
//   const [travelMode, setTravelMode] = useState("DRIVING");
//   const [routeData, setRouteData] = useState([]);
//   const [directions, setDirections] = useState([]);
//   const [markers, setMarkers] = useState([]);
//   const [directionSteps, setDirectionSteps] = useState([]);
//   const mapRef = useRef();
//   const selectedPolyline = useRef();
//   const renderRoute = useSelector((state) => state.search.renderRoute);
//   const dispatch = useDispatch();
//   const [currLines, setCurrLines] = useState([]);

//   const onClick = () => {
//     console.log("CLICKED" + selectedPolyline.current);
//   };

//   useEffect(() => {
//     setUserLocation(searchSelector.userLocation);
//   }, [searchSelector]);

//   useEffect(() => {
//     const latLng = stops.map((product) => product.shop_docs[0].latLng);
//     const newStart = latLng.slice(0, latLng.length - 1);
//     const newEnd = latLng.slice(1, latLng.length);
//     setStartPoints(newStart);
//     setEndPoints(newEnd);
//     setMarkers(latLng);
//   }, [stops, setStartPoints, setEndPoints, setMarkers]);

//   useEffect(() => {
//     const DirectionsService = new window.google.maps.DirectionsService();
//     let tempArr = [];

//     console.log("here");
//     console.log(startPoints.length);
//     for (let i = 0; i < startPoints.length; i++) {
//       DirectionsService.route(
//         {
//           origin: startPoints[i],
//           destination: endPoints[i],
//           travelMode: travelMode,
//           provideRouteAlternatives: true,
//         },
//         (response, status) => {
//           if (status === "OK") {
//             let routes = [];
//             tempArr.push(response);
//             for (let j = 0; j < response.routes.length; j++) {
//               routes.push({
//                 distance: response.routes[j].legs[0].distance,
//                 duration: response.routes[j].legs[0].duration,
//                 fare: response.routes[j].fare,
//                 end_address: response.routes[j].legs[0].end_address,
//                 start_address: response.routes[j].legs[0].start_address,
//                 routeIndex: j,
//               });
//             }
//             routeData.push(routes);
//             if (tempArr.length === startPoints.length) {
//               setDirections(tempArr);
//             }

//             if (routeData.length === startPoints.length) {
//               setRouteData(routeData);
//             }
//           } else {
//             console.error(`error fetching directions ${response}`);
//           }
//         }
//       );
//     }
//     if (directions.length === stops.length - 1) {
//       //default direction steps
//       const dirSteps = directions.map(
//         (direction) => direction.routes[0].legs[0]
//       );
//       setDirectionSteps(dirSteps);
//       if (renderRoute) {
//         dispatch(loadDirectionSteps(dirSteps));
//       }
//       const len = directions.length;
//       console.log("im here");
//     }
//   }, [
//     setDirections,
//     setRouteData,
//     setStartPoints,
//     setEndPoints,
//     setDirectionSteps,
//     setCurrLines,
//     currLines,
//     renderRoute,
//     stops,
//     startPoints,
//     endPoints,
//   ]);

//   return (
//     <GoogleMap
//       defaultZoom={12}
//       defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
//       gestureHandling="cooperative"
//       defaultOptions={{ disableDefaultUI: true }}
//       ref={mapRef}
//     >
//       {userLocation ? (
//         <Marker key={createKey(userLocation)} postion={userLocation} />
//       ) : null}
//       {!renderRoute && productArray.length > 0
//         ? productArray.map((product, index) => {
//             return (
//               <Marker
//                 key={createKey(product.shop_docs[0].latLng)}
//                 position={product.shop_docs[0].latLng}
//               />
//             );
//           })
//         : null}
//       {renderRoute && stops.length > 0 && directions.length > 0
//         ? directions.map((direction, idx) => {
//             return direction.routes.map((route, index) => {
//               return (
//                 <Polyline
//                   onClick={() => {
//                     const newDirSteps = directionSteps;
//                     newDirSteps[idx] = direction.routes[index].legs[0];
//                     setDirectionSteps(newDirSteps);
//                     dispatch(updateDirectionSteps(newDirSteps));

//                     let newCurrLines = currLines;
//                     if (currLines.length === 0) {
//                       newCurrLines = Array(directions.length).fill(0);
//                     }
//                     newCurrLines[idx] = index;
//                     setCurrLines(newCurrLines);
//                     console.log("idx" + newCurrLines[idx]);
//                   }}
//                   path={direction.routes[index].overview_path}
//                   options={{
//                     strokeColor:
//                       currLines.length === 0
//                         ? colors[idx][index === 0 ? 400 : 200]
//                         : colors[idx][index === currLines[idx] ? 400 : 200],
//                     strokeWeight: 6,
//                     zIndex:
//                       currLines.length === 0
//                         ? index === 0
//                           ? 5
//                           : 1
//                         : index === currLines[idx]
//                         ? 5
//                         : 1,
//                     clickable: true,
//                   }}
//                 />
//               );
//             });
//           })
//         : null}
//       {renderRoute && stops.length > 0 && markers.length > 0
//         ? markers.map((marker, index) => {
//             return (
//               <Marker
//                 key={index}
//                 position={marker}
//                 label={String.fromCharCode(65 + index)}
//               />
//             );
//           })
//         : null}
//     </GoogleMap>
//   );
// }

// const MapWrapped = withScriptjs(withGoogleMap(Map));

// export const LocalinkMap = () => {
//   return (
//     <div style={{ width: "100vw", height: "92vh" }}>
//       <MapWrapped
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// };
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
export const LocalinkMap = () => {
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
};
