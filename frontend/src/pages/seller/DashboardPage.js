import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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
