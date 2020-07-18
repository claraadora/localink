import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { lightBlue, cyan } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  startButton: {
    background: `linear-gradient(to bottom right, ${lightBlue[600]}, ${cyan[50]})`,
    border: 0,
    borderRadius: 3,
    boxShadow: `0 3px 5px 2px ${lightBlue[100]}`,
    color: "white",
    height: 70,
    width: 300,
    padding: "0 30px",
    justifyContent: "center",
  },
}));

function LandingPage() {
  const classes = useStyles();

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
          Linking you to your potential customers!
        </Typography>

        <Typography variant="h5" color="textSecondary" align="center">
          Help you find customers and increase visibility!
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={classes.startButton}
          component={Link}
          to="/business/signup"
        >
          Join now!
        </Button>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
