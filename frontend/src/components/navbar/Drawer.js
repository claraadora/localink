import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ProductMenu from "../menu/ProductMenu";
import ProductPopover from "../popover/ProductPopover";
import AccountPopover from "../popover/AccountPopover";
import lightBlue from "@material-ui/core/colors/lightBlue";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    zIndex: theme.zIndex.drawer + 1,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    bgColorHover: lightBlue[300],
  },
}));

export default function LocalinkDrawer() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <MenuList>
            <MenuItem>
              <ProductPopover />
            </MenuItem>
            <MenuItem>
              <AccountPopover />
            </MenuItem>
          </MenuList>
          <MenuItem />
        </div>
      </Drawer>
    </div>
  );
}
