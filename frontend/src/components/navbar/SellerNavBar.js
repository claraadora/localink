import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function LoggedSellerNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button
            color="inherit"
            component={Link}
            to="/business"
            backgroundColor="transparent"
          >
            <Typography variant="navBar">localink for sellers</Typography>
          </Button>
          <div className={classes.grow} />
          <Button color="inherit" component={Link} to="/">
            shop on localink
          </Button>
          <Button color="inherit" component={Link} to="/business/signup">
            Sign up
          </Button>
          <Button color="inherit" component={Link} to="/business/login">
            Log in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
