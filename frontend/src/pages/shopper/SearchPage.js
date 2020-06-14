import React from "react";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import LocalinkMap from "../../components/map/Map";
import { LocationList } from "../../components/list/LocationList";
import { Cart } from "../../components/cart/Cart";
import { ItineraryList } from "../../components/list/ItineraryList";
import { useDispatch } from "react-redux";
import { clearSearch } from "../../actions/shopper/searchActions";

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
    top: "75px",
    right: "10px",
    height: "700px",
    width: "25%",
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
  const dispatch = useDispatch();
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
