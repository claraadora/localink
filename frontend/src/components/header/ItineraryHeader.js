import React from "react";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  header: {
    backgroundColor: amber[100],
    width: "100%",
    display: "flex",
    padding: "0px 0px 0px 0px",
  },
});

export const ItineraryHeader = () => {
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const classes = useStyles();

  if (itineraryItems.length === 0) {
    return null;
  } else {
    return (
      <Paper className={classes.header}>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="body1">Itinerary</Typography>
          </Grid>
          <Grid item>
            <Button>
              <Typography variant="body2">Calculate Routes</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};
