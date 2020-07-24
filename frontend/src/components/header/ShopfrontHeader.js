import React, { useState } from "react";
import { Paper, Typography, Button, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { loadRoute } from "../../actions/shopper/searchActions";

const useStyles = makeStyles({
  header: {
    backgroundColor: teal[50],
    width: "100%",
    display: "flex",
    padding: "0px 0px 0px 0px",
  },
});

export const ShopfrontHeader = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.header}>
      <Grid container direction="column">
        <Grid item container direction="row">
          <Grid item>
            <Avatar src={props.avatar} alt={props.name} />
          </Grid>
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="h5" gutterButtom>
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h7">{props.address}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h7">{props.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
