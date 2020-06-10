import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { SearchInput } from "../input/SearchInput";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
}));

export default function ShopperNavBar({ isSearchPage }) {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button color="inherit" href="/">
            <Typography variant="h1">localink</Typography>
          </Button>
          {isSearchPage ? <SearchInput /> : null}
          <div className={classes.grow} />
          <Button color="inherit" component={Link} to="/business">
            sell on localink
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign up
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Log in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
