import React, { useState, useEffect } from "react";
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
  pink,
  deepPurple,
  indigo,
  cyan,
  teal,
  lime,
  orange,
  amber,
} from "@material-ui/core/colors";

function createKey(location) {
  return location.lat + location.lng;
}

const colors = [pink, deepPurple, indigo, cyan, teal, lime, orange, amber];

const A = { lat: 1.352783, lng: 103.769353 }; //Tampines Mall
const B = { lat: 1.314948, lng: 103.764692 }; //Clementi Mall
const C = { lat: 1.307043, lng: 103.788335 }; //Star vista
const D = { lat: 1.263746, lng: 103.823665 }; //Vivo City

function Map() {
  const productArray = useSelector((state) => state.search.productArray);
  const loading = useSelector((state) => state.search.loading);
  const [searchResult, setSearchResult] = useState(null);
  const [startPoints, setStartPoints] = useState([A, B, C]);
  const [endPoints, setEndPoints] = useState([B, C, D]);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [routeData, setRouteData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!loading && productArray) {
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();
    let start = 0;
    let tempArr = [];

    for (let i = 0; i < startPoints.length; i++) {
      console.log(i);
      DirectionsService.route(
        {
          origin: startPoints[i],
          destination: endPoints[i],
          travelMode: travelMode,
          provideRouteAlternatives: true,
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            let routes = [];
            routeData.push(routes);
            tempArr.push(response);
            console.log(response);
            console.log("dirLength" + tempArr.length);

            for (let j = 0; j < response.routes.length; j++) {
              routeData[start].push({
                distance: response.routes[j].legs[0].distance,
                duration: response.routes[j].legs[0].duration,
                fare: response.routes[j].fare,
                end_address: response.routes[j].legs[0].end_address,
                start_address: response.routes[j].legs[0].start_address,
                routeIndex: j,
              });
            }
            start++;
            console.log(directions.length + "dirdiridiiridir");
            if (tempArr.length === startPoints.length) {
              setDirections(tempArr);
            }
            setRouteData(routeData);
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
      );
    }
    setMarkers([...[startPoints[0], ...endPoints]]);
    console.log("temp" + tempArr);
  }, [setDirections]);

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 1.3521, lng: 103.8198 }}>
      {console.log("routeData" + routeData)}
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
      {/* {directions !== []
        ? directions.map((direction, index) => {
            for (let i = 0; i < direction.routes.length; i++) {
              console.log(direction.routes);
              return (
                <>
                  <DirectionsRenderer
                    directions={direction}
                    routeIndex={i}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: colors[index][i === 0 ? 400 : 100],
                        strokeWeight: 5,
                        zIndex: 1,
                      },
                    }}
                  />
                </>
              );
            }
          })
        : null} */}
      {directions !== []
        ? directions.map((direction, idx) => {
            return direction.routes.map((route, index) => (
              <DirectionsRenderer
                directions={direction}
                routeIndex={index}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: colors[idx][index === 0 ? 400 : 200],
                    strokeWeight: 5,
                    zIndex: direction.routes.length - index,
                  },
                }}
              />
            ));
          })
        : null}
      {markers !== []
        ? markers.map((marker, index) => (
            <Marker position={marker} label={String.fromCharCode(65 + index)} />
          ))
        : null}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export const LocalinkMap = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
