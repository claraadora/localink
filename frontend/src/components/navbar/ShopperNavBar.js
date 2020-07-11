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
import { SearchInput } from "../input/SearchInput";
import { OptionSelect } from "../select/OptionSelect";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/shopper/authActions";
import { LocationDialog } from "../../components/dialog/LocationDialog";

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
        <Grid container direction="column" justify="center">
          <Grid container direction="row" spacing={2} md={12}>
            <Grid item md={0} xs={1} />
            <Grid item container justify="flex-start" md={2} xs={2}>
              <Button color="inherit" href="/">
                <Typography variant="h1">localink</Typography>
              </Button>
            </Grid>
            <Grid item md={5} xs={0} />
            {isAuthenticated ? (
              <Grid item container md={4} xs={4} justify="space-evenly">
                <Grid
                  item
                  container
                  xs={4}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenu}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Button component={Link} to="/chat">
                    Chat
                  </Button>
                </Grid>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/"
                      disableRipple={true}
                      onClick={() => dispatch(logout())}
                    >
                      Log out
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
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
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
