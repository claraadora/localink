import React, { useState } from "react";
import { Paper, Typography, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal, cyan } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { loadRoute } from "../../actions/shopper/searchActions";
import NavigationIcon from "@material-ui/icons/Navigation";
import LinkIcon from "@material-ui/icons/Link";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { NavLinkDialog } from "../dialog/NavLinkDialog";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: teal[50],
    width: "30%",
    display: "flex",
    padding: "0px 0px 0px 0px",
  },
  navButton: {
    color: cyan[600],
  },
  phoneButton: {
    color: cyan[600],
  },
}));

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
        <Grid item md={2}>
          <Typography variant="h6">Itinerary</Typography>
        </Grid>
        {itineraryItems.length > 0 ? (
          <>
            <Grid
              item
              container
              direction="column"
              md={4}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <IconButton onClick={() => dispatch(loadRoute())}>
                  <NavigationIcon
                    fontSize="medium"
                    className={classes.navButton}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="caption">Render Route</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              md={4}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <NavLinkDialog />
              </Grid>
              <Grid item>
                <Typography variant="caption">Get Navigation Link</Typography>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    );
  }
};
