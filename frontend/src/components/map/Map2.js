import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
  InfoWindow
} from 'react-google-maps';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import {
  pink,
  deepPurple,
  indigo,
  cyan,
  teal,
  lime,
  orange,
  amber
} from '@material-ui/core/colors';

function createKey(location) {
  return location.lat + location.lng;
}
function createPolyline(start, i) {
  const polyline = new window.google.maps.Polyline({
    //   path: response.routes[i].overview_path,
    strokeColor: colors[i % (colors.length - 1)],
    strokeWeight: 5,
    zIndex: 1,
    tag: {
      index: start,
      nestedIndex: i
    }
  });
}
const colors = ['#ff99ff', '#99c2ff', '#ff8080', '#ff8c1a'];
const A = { lat: 1.30655, lng: 103.773523 };
const B = { lat: 1.31655, lng: 103.773523 };
const C = { lat: 1.32655, lng: 103.773523 };
const D = { lat: 1.308086, lng: 103.773538 };

function Map() {
  const productArray = useSelector(state => state.search.productArray);
  const loading = useSelector(state => state.search.loading);
  const [searchResult, setSearchResult] = useState(null);
  const [startPoints, setStartPoints] = useState([A]);
  const [endPoints, setEndPoints] = useState([B]);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [routeData, setRouteData] = useState([]);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!loading && productArray) {
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();
    let start = 0;
    console.log('inside useEffect to draw route');

    for (let i = 0; i < startPoints.length; i++) {
      console.log(i);
      DirectionsService.route(
        {
          origin: startPoints[i],
          destination: endPoints[i],
          travelMode: travelMode
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            let routes = [];
            routeData.push(routes);

            for (let j = 0; j < response.routes.length; j++) {
              routeData[start].push({
                distance: response.routes[j].legs[0].distance,
                duration: response.routes[j].legs[0].duration,
                fare: response.routes[j].fare,
                end_address: response.routes[j].legs[0].end_address,
                start_address: response.routes[j].legs[0].start_address,
                routeIndex: j
              });

              const polyline = createPolyline(i, j);
            }
            start++;
            setRouteData(routeData);
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
      );
    }
  }, [startPoints, endPoints]);

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 1.3521, lng: 103.8198 }}>
      {console.log('routeData' + routeData)}
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
      {routeData !== [] &&
        routeData.map(routes => {
          console.log('each route is');
          console.log(routes);
          for (let i = 0; i < routes.length; i++) {
            return (
              <DirectionsRenderer directions={routes} routeIndex={i} polyline />
            );
          }
        })}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export const LocalinkMap = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
