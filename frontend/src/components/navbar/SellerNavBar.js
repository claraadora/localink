import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  IconButton,
  MenuItem,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  Collapse,
} from "@material-ui/core";
import { AccountCircle, ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/seller/authActions";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    width: "100%",
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}));

const drawerItems = {
  list: [
    {
      name: "account",
      label: "My Account",
      items: [
        {
          name: "profile",
          label: "Profile",
          link: "/business/account/profile",
        },
        {
          name: "accountSettings",
          label: "Account Settings",
          link: "/business/account/settings",
        },
      ],
    },
    {
      name: "product",
      label: "Products",
      items: [
        {
          name: "manageProduct",
          label: "Manage Products",
          link: "/business/product/manage",
        },
        {
          name: "addProduct",
          label: "Add Product",
          link: "/business/product/add",
        },
      ],
    },
    {
      name: "users",
      label: "Users",
      items: [
        {
          name: "manageUsers",
          label: "Manage Users",
          link: "/business/users/manage",
        },
        {
          name: "addUsers",
          label: "Add User",
          link: "/business/users/add",
        },
      ],
    },
    {
      name: "review",
      label: "Reviews",
      items: [
        {
          name: "viewReviews",
          label: "View Reviews",
          link: "/business/review",
        },
      ],
    },
    {
      name: "chat",
      label: "Chat",
      items: [
        {
          name: "viewChat",
          label: "View Chat",
          link: "/business/chat",
        },
      ],
    },
  ],
};

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

  function handleCollapse(name) {
    setOpenCollapse({ ...openCollapse, ...{ [name]: !openCollapse[name] } });
  }
  const [openCollapse, setOpenCollapse] = useState({
    account: false,
    product: false,
    review: false,
    chat: false,
  });
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={2}
            md={12}
            alignItems="center"
          >
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
                  <Button
                    color="inherit"
                    component={Link}
                    to="/business/signup"
                  >
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
      {isAuthenticated && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            {drawerItems.list.map((mainItem) => {
              return (
                <List className={classes.list}>
                  <ListItem
                    button
                    onClick={() => handleCollapse(mainItem.name)}
                  >
                    <ListItemText primary={mainItem.label} />
                    {openCollapse[mainItem.name] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    component="li"
                    in={openCollapse[mainItem.name]}
                    timeout="out"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {mainItem.items.map((subItem) => {
                        return (
                          <ListItem
                            button
                            component={Link}
                            to={subItem.link}
                            className={classes.nested}
                          >
                            <ListItemText primary={subItem.label} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </List>
              );
            })}
          </div>
        </Drawer>
      )}
    </div>
  );
}
