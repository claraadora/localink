import React, { useState } from "react";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { loadRoute } from "../../actions/shopper/searchActions";

const useStyles = makeStyles({
  header: {
    backgroundColor: teal[50],
    width: "100%",
    display: "flex",
    padding: "0px 0px 0px 0px",
  },
});

export const ItineraryHeader = () => {
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const classes = useStyles();
  const isDisplayingDirections = useState(false);
  const dispatch = useDispatch();
  if (itineraryItems.length === 0) {
    return null;
  } else {
    return (
      <Paper className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Typography variant="h6">Itinerary</Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2}>
            <Button onClick={() => dispatch(loadRoute())}>
              <Typography variant="body2">Calculate Routes</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};
