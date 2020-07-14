import React from "react";
import { LocalinkMap } from "../../components/map/Map2";
import { ItineraryList } from "../../components/list/ItineraryList";
import { ItineraryHeader } from "../../components/header/ItineraryHeader";
import { LocationList } from "../../components/list/LocationList";
import { DirectionList } from "../../components/list/DirectionList";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { SearchNavBar } from "../../components/navbar/SearchNavBar";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  locationList: {
    position: "fixed",
    top: "20%",
    right: "2%",
    height: "78%",
    width: "22%",
    zIndex: 100,
  },
  itineraryList: {
    position: "fixed",
    bottom: "2%",
    right: "25%",
    width: "70%",
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
  searchNavBar: {
    position: "fixed",
    top: "10%",
    left: "25%",
    width: "50%",
    display: "inline-block",
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
      <div className={classes.searchNavBar}>
        <SearchNavBar />
      </div>
      <div className={classes.itineraryList}>
        <ItineraryList />
      </div>
    </div>
  );
}

export default SearchPage;
