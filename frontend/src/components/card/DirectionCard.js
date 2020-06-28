import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

function writeDirectionsSteps(data) {
  const steps = data.steps;
  const start_address = data.start_address;
  const end_address = data.end_address;
  const start_location = data.start_location;
  const end_location = data.end_location;

  var overlayContent = document.getElementById("right-panel");
  overlayContent.innerHTML = "";

  overlayContent.innerHTML +=
    `<h2> From A: </h2>` +
    start_address +
    "<hr>" +
    `<h2> To B: </h2>` +
    end_address +
    "</h2> <hr>";

  for (var i = 0; i < steps.length; i++) {
    const count = i + 1;
    overlayContent.innerHTML +=
      "<p>" +
      +count +
      ". " +
      steps[i].instructions +
      "</p><small>" +
      steps[i].distance.text +
      "</small>" +
      "<hr>";
  }
}

export const DirectionCard = (props) => {
  const classes = useStyles();
  const data = props.content;
  const steps = data.steps;
  const startAddress = data.start_address;
  const endAaddress = data.end_address;
  const startLocation = data.start_location;
  const endLocation = data.end_location;

  return (
    <Card
      className={classes.root}
      style={{ ...props.style, padding: "10px 0px 2px 0px" }}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item container direction="row" spacing={1}>
          <Grid item>
            <Typography>{String.fromCharCode(65 + props.index)}</Typography>
          </Grid>
          <Grid item>
            <Typography>{startAddress}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
