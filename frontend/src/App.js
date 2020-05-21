import React from "react";
import AppSeller from "./AppSeller";
import AppShopper from "./AppShopper";
import { theme } from "./theme";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";

export default function App({ isShopper }) {
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
