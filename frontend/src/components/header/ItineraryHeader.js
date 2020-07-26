import React, { useState } from "react";
import { Paper, Typography, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { loadRoute, createNavLink } from "../../actions/shopper/searchActions";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles({
  header: {
    backgroundColor: teal[50],
    width: "15%",
    display: "flex",
    padding: "0px 0px 0px 0px",
  },
});

export const ItineraryHeader = () => {
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const stops = useSelector((state) => state.search.stops);
  const travelMode = useSelector((state) => state.search.travelMode);
  const classes = useStyles();
  const dispatch = useDispatch();
  if (itineraryItems.length === 0) {
    return null;
  } else {
    return (
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.header}
      >
        <Grid item>
          <Typography variant="h6">Itinerary</Typography>
        </Grid>
        {itineraryItems.length > 0 ? (
          <Grid item>
            <IconButton onClick={() => dispatch(loadRoute())}>
              <NavigationIcon fontSize="medium" />
            </IconButton>
            <IconButton
              onClick={() => dispatch(createNavLink(stops, travelMode))}
            >
              <NavigationIcon fontSize="medium" />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    );
  }
};
