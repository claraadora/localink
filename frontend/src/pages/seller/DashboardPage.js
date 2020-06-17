import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const shopName = useSelector((state) => state.auth.user.shopName);

  return (
    <div className={classes.paper}>
      <h1>Welcome, {shopName}</h1>
    </div>
  );
}
