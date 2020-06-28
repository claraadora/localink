import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { teal, lightGreen } from "@material-ui/core/colors";
import { getThemeProps } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  header: {
    backgroundColor: teal[100],
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

  return (
    <Card
      className={classes.root}
      style={{ ...props.style, padding: "10px 0px 2px 0px" }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid
          item
          container
          direction="row"
          spacing={1}
          className={classes.header}
        >
          <Grid item xs={1} />
          <Grid item>
            <Typography variant="h6">
              {String.fromCharCode(65 + props.nth)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {props.last ? props.content : props.content.start_address}
            </Typography>
          </Grid>
        </Grid>
        {!props.last
          ? props.content.steps.map((step, index) => {
              return (
                <Grid item container direction="row" spacing={1}>
                  <Grid item xs={1} />
                  <Grid item xs={1}>
                    {index + 1}
                  </Grid>
                  <Grid item xs={8}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${step.instructions}`,
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      {step.distance.text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Card>
  );
};

// {step.instructions.replace(/<\/?[^>]+(>|$)/g, "")}
