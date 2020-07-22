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
  makeStyles,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/seller/authActions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 24,
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
}));
export default function SellerNavBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row" spacing={2} md={12} alignItems="center">
          <Grid item md={1} xs={0} />
          <Grid item container justify="flex-start" md={2} xs={2}>
            <Button color="inherit" href="/business">
              <Grid
                item
                container
                direction="row"
                alignItems="flex-end"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="h1">localink</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">for sellers</Typography>
                </Grid>
              </Grid>
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
                <Button color="inherit" component={Link} to="/">
                  Shop on localink
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/business/signup">
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/business/login">
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
