import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  const classes = useStyles();

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div className={classes.root}>
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

export default Alert;
