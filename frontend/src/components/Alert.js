import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MUIAlert from "@material-ui/lab/Alert";
import { mergeClasses } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
}));

const Alert = () => {
  const alerts = useSelector((state) => {
    console.log(state);
    return state.alert;
  });

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div className={mergeClasses.root}>
        <MUIAlert
          variant="filled"
          severity={alert.alertType == "success" ? "success" : "error"}
        >
          {alert.message}
        </MUIAlert>
      </div>
    ));
  }
  return <Grid item />;
};

export default Alert;
