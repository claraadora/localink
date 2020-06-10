import React from "react";
import { Typography, Grid } from "@material-ui/core";
import LocalinkMap from "../../components/map/Map";
import { LocationList } from "../../components/window/Window";
import { SearchInput } from "../../components/input/SearchInput";

function SearchPage() {
  return (
    <Grid item container direction="row">
      <Grid item sm={9} style={{ position: "relative", height: "80vh" }}>
        <LocalinkMap />
      </Grid>
      <Grid item sm={3}>
        <LocationList />
      </Grid>
    </Grid>
  );
}

export default SearchPage;
