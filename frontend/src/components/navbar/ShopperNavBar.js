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
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { SearchInput } from "../input/SearchInput";
import { OptionSelect } from "../select/OptionSelect";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/seller/authActions";

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
        <Grid container direction="row" spacing={4}>
          <Grid item>
            <Button color="inherit" href="/">
              <Typography variant="h1">localink</Typography>
            </Button>
          </Grid>
          {isSearchPage ? (
            <>
              <Grid item>
                <SearchInput />
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={2}
                >
                  <Grid item>Sort by: </Grid>
                  <Grid item>
                    <OptionSelect />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid item xs={6} />
          )}
          {isAuthenticated ? (
            <>
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
              </Menu>{" "}
            </>
          ) : (
            <>
              {" "}
              <Grid item>
                <Button color="inherit" component={Link} to="/business">
                  sell on localink
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/signup">
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/login">
                  Log in
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
