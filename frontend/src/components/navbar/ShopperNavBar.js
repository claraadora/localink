import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/shopper/authActions";

export default function ShopperNavBar({ isSearchPage }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" spacing={2} md={12} alignItems="center">
          <Grid item md={1} xs={0} />
          <Grid item container justify="flex-start" md={2} xs={2}>
            <Button color="inherit" href="/">
              <Typography variant="h1">localink</Typography>
            </Button>
          </Grid>
          <Grid item md={5} xs={0} />
          {isAuthenticated ? (
            <Grid item container md={4} xs={4} justify="space-evenly">
              <Grid item>
                <Button component={Link} to="/chat">
                  Chat
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  disableRipple={true}
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item container md={4} xs={8} justify="space-around">
              <Grid item>
                <Button color="inherit" component={Link} to="/business">
                  Sell on localink
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/login">
                  Log In
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
