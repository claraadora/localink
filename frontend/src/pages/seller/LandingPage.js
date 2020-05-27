import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  startButton: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
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

function LandingPage() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={10}
    >
      <Grid item md={12} />
      <Grid item md={12} />
      <Grid item md={12}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Linking you to your potential customers!
        </Typography>
        <Grid item md={12}>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Help you find customers and increase visibility!
          </Typography>
        </Grid>
      </Grid>
      <Grid item md={12} />
      <Button
        className={classes.startButton}
        component={Link}
        to="/business/signup"
      >
        Join now!
      </Button>
    </Grid>
  );
}

export default LandingPage;
