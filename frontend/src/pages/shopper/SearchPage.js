import React from "react";
import { LocalinkMap } from "../../components/map/Map2";
// import LocalinkMap from "../../components/map/Map";
import { LocationList } from "../../components/list/LocationList";
import { ItineraryList } from "../../components/list/ItineraryList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "92vh",
    width: "calc(100vw-10px)",
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  locationList: {
    position: "fixed",
    top: "90px",
    right: "15px",
    height: "684px",
    width: "22%",
    zIndex: 100,
  },
  itineraryList: {
    position: "fixed",
    bottom: "15px",
    left: "30px",
    width: "94%",
    height: "120px",
  },
});

function SearchPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.map}>
        <LocalinkMap />
      </div>
      <div className={classes.locationList}>
        <LocationList />
      </div>
      <div className={classes.itineraryList}>
        <ItineraryList />
      </div>
    </div>
  );
}

export default SearchPage;
