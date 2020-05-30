import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ProductTable from "../../components/table/ProductTable";
import ProductForm from "../../components/form/ProductForm";
import ProfileForm from "../../components/form/ProfileForm";
import { useSelector } from "react-redux";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: theme.spacing(30),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  // const name = useSelector((state) => state.user.shopName);

  return (
    <div className={classes.paper}>
      <h1>Welcome</h1>
    </div>
  );
}
