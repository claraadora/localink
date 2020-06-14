import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import LocalinkMap from "../../components/map/Map";
import { LocationList } from "../../components/list/LocationList";
import { Cart } from "../../components/cart/Cart";
import { ItineraryList } from "../../components/list/ItineraryList";
import { useDispatch } from "react-redux";
import { clearSearch } from "../../actions/shopper/searchActions";
function SearchPage() {
  const dispatch = useDispatch();
  return (
    <Grid container direction="column">
      <Grid item container direction="row">
        <Grid item sm={9} style={{ position: "relative", height: "70vh" }}>
          <LocalinkMap />
        </Grid>
        <Grid item sm={3}>
          <LocationList />
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={() => dispatch(clearSearch())}>Clear</Button>
      </Grid>
      <Grid item>
        <ItineraryList />
      </Grid>
    </Grid>
  );
}

export default SearchPage;
