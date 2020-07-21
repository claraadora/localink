import React, { useEffect } from "react";
import AppSeller from "./AppSeller";
import AppShopper from "./AppShopper";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter, Route, Switch } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/business" component={AppSeller} />
        <Route path="/" component={AppShopper} />
      </Switch>
    </BrowserRouter>
  );
}
