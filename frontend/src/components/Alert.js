import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    left: "30%",
    position: "relative",
  },
}));

const LocalinkAlert = () => {
  const alerts = useSelector((state) => state.alert);
  const classes = useStyles();

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div key={alert.id} className={classes.root}>
        <Alert
          variant="filled"
          severity={alert.alertType === "success" ? "success" : "error"}
        >
          {alert.message}
        </Alert>
      </div>
    ));
  }
  return null;
};

export default LocalinkAlert;
