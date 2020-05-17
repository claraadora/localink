import React from "react";
import { render } from "react-dom";
import App from "./App";
import { theme } from "./theme";

import { ThemeProvider } from "@material-ui/core/styles";

// const store = createStore(rootReducer);

render(
  <ThemeProvider theme={theme}>
    <App />,
  </ThemeProvider>,
  document.getElementById("root")
);
