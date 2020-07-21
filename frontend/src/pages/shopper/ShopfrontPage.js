import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { yellow, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  startButton: {
    background: `linear-gradient(to bottom right, ${green[400]}, ${yellow[500]})`,
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(10, 107, 11, .3)",
    color: "white",
    height: 70,
    width: 300,
    padding: "0 30px",
    justifyContent: "center",
  },
}));

export const ShopfrontPage = () => {
  const classes = useStyles();
  const currShop = 

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
      spacing={5}
    >
      <Grid item>
        <Typography variant="h2" color="textPrimary" gutterBottom>
          Local shopping made fun and easy!
        </Typography>
        <Typography variant="h5" color="textSecondary" align="center">
          Quickly help you find where to buy what you are looking for!
        </Typography>
      </Grid>
      <Grid item>
        <Button className={classes.startButton} component={Link} to="/search">
          Start searching now!
        </Button>
      </Grid>
    </Grid>
  );
}

