import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
  drawer: {
    position: "relative",
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1,
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

export const LocalinkDrawer = () => {
  const classes = useStyles();
  const [openCollapse, setOpenCollapse] = useState({
    account: false,
    product: false,
    review: false,
    chat: false,
  });
  function handleCollapse(name) {
    setOpenCollapse({ ...openCollapse, ...{ [name]: !openCollapse[name] } });
  }

  return (
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
                {openCollapse[mainItem.name] ? <ExpandLess /> : <ExpandMore />}
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
  );
};
