import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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

export default function LoggedSellerNavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCollapse, setOpenCollapse] = useState({
    account: false,
    product: false,
    review: false,
    chat: false,
  });
  const json = drawerItems;
  const open = Boolean(anchorEl);
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

  const menuId = "primary-search-account-menu";

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button
            color="inherit"
            component={Link}
            to="/business/dashboard"
            backgroundColor="transparent"
          >
            <Typography variant="navBar">localink for sellers</Typography>
          </Button>
          <div className={classes.grow} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
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
                to="/business"
                disableRipple={true}
                onClick={() => dispatch(logout())}
              >
                Log out
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
                <ListItem button onClick={() => handleCollapse(mainItem.name)}>
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
    </div>
  );
}
