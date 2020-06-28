import React from "react";
import { LocalinkMap } from "../../components/map/Map2";
import { ItineraryList } from "../../components/list/ItineraryList";
import { ItineraryHeader } from "../../components/header/ItineraryHeader";
import { LocationList } from "../../components/list/LocationList";
import { DirectionList } from "../../components/list/DirectionList";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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
    bottom: "40px",
    left: "30px",
    width: "70%",
    height: "100px",
  },
  itineraryHeader: {
    position: "fixed",
    bottom: "130px",
    left: "30px",
    width: "70%",
    height: "45px",
  },
  directionList: {
    position: "fixed",
    top: "90px",
    right: "15px",
    height: "684px",
    width: "22%",
    zIndex: 100,
  },
});

function SearchPage() {
  const classes = useStyles();
  const renderRoute = useSelector((state) => state.search.renderRoute);

  return (
    <div className={classes.root}>
      <div className={classes.map}>
        <LocalinkMap />
      </div>
      {renderRoute ? (
        <div className={classes.directionList}>
          <DirectionList />
        </div>
      ) : (
        <div className={classes.locationList}>
          <LocationList />
        </div>
      )}
      <div className={classes.itineraryHeader}>
        <ItineraryHeader />
      </div>
      <div className={classes.itineraryList}>
        <ItineraryList />
      </div>
    </div>
  );
}

export default SearchPage;
