import React, { useEffect } from "react";
import AppSeller from "./AppSeller";
import AppShopper from "./AppShopper";
import { theme } from "./theme";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";
import { loadUser } from "./actions/authActions";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App({ isShopper }) {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  if (!isShopper) {
    return (
      <ThemeProvider theme={theme}>
        <AppShopper />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={themeSeller}>
        <AppSeller />
      </ThemeProvider>
    );
  }
}
