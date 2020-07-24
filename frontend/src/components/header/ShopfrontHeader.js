import React, { useState } from "react";
import { Paper, Typography, IconButton, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { loadRoute } from "../../actions/shopper/searchActions";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    display: "flex",
    padding: "0.5% 0.5% 0.5% 0.5%",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export const ShopfrontHeader = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.header}>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item md={1} />
        <Grid
          item
          container
          direction="row"
          justify="center"
          spacing={1}
          md={7}
        >
          <Grid item>
            <Avatar
              src={props.avatar}
              alt={props.name}
              className={classes.avatar}
            />
          </Grid>
          <Grid item container direction="column" md={10}>
            <Grid item>
              <Typography variant="h4" gutterButtom>
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h7">{props.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" alignItems="center" md={3}>
          <Grid item container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="h7">📍Location: {props.address}</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <NavigationIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h7">⭐ Ratings: {props.ratings}</Typography>
          </Grid>
        </Grid>
        <Grid item md={1} />
      </Grid>
    </Paper>
  );
};
