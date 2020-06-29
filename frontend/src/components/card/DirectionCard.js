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

function trimString(word, maxLength) {
  return word <= maxLength ? word : word.substring(0, maxLength - 3) + "...";
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
              {props.last
                ? props.content
                : trimString(props.content.start_address, 18)}
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
