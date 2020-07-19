import React, { useEffect } from "react";
import AppSeller from "./AppSeller";
import AppShopper from "./AppShopper";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { loadUser } from "./actions/seller/authActions";
import { getCurrentProfile } from "./actions/seller/profileActions";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter, Route, Switch } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/business" component={AppSeller} />
        <Route path="/" component={AppShopper} />
      </Switch>
    </BrowserRouter>
  );
}
