import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

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
          className={classes.header}
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h6">
              {String.fromCharCode(65 + props.nth)}
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            <Typography noWrap variant="subtitle1">
              {props.leg.start_address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">➡️</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {String.fromCharCode(65 + props.nth + 1)}
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            <Typography noWrap variant="subtitle1">
              {props.leg.end_address}
            </Typography>
          </Grid>
        </Grid>
        {props.last
          ? null
          : props.leg.steps.map((step, index) => {
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
            })}
      </Grid>
    </Card>
  );
};

// {step.instructions.replace(/<\/?[^>]+(>|$)/g, "")}
