import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import store from "./store";

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />,
    </ThemeProvider>
    , document.getElementById("root")
  </Provider>
);
