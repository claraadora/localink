import React from "react";
import { useSelector } from "react-redux";
import "./alert.css";

const Alert = () => {
  const alerts = useSelector((state) => {
    console.log(state);
    return state.alert;
  });

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.message}
      </div>
    ));
  }
  return null;
};

export default Alert;
