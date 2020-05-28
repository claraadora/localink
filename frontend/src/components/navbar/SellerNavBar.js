import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
}));

export default function LoggedSellerNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          ></IconButton>
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
