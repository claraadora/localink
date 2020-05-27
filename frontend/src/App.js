import React, { useState, useEffect } from "react";
import AppSeller from "./AppSeller";
import AppShopper from "./AppShopper";
import { theme } from "./theme";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";
import { loadUser } from "./actions/authActions";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route path="/business" component={AppSeller} />
        <Route path="/" component={AppShopper} />
      </ThemeProvider>
    </BrowserRouter>
  );
}
