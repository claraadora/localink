import { createMuiTheme } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";

export const themeSeller = createMuiTheme({
  palette: {
    secondary: {
      main: lightGreen[300],
    },
    primary: {
      main: yellow[500],
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Metropolis", sans-serif',
    fontSize: 13,
    fontWeight: 400,
    h1: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: 100,
      fontSize: "2.125rem",
      letterSpacing: 0,
    },
    h6: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: 500,
      fontSize: "0.9375rem",
    },
    subtitle1: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: "normal",
      fontSize: "0.6875rem",
    },
    body1: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: "normal",
      fontSize: "0.8125rem",
      lineHeight: 1.38,
      letterSpacing: "normal",
      color: grey[900],
    },
    button: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: 500,
      fontSize: "1.3rem",
      letterSpacing: 1,
      textTransform: "none",
      color: yellow[100],
    },
    navBar: {
      fontFamily: '"Metropolis", sans-serif',
      fontWeight: 500,
      fontSize: "1.1rem",
      letterSpacing: 1,
      textTransform: "none",
      color: "white",
    },
  },
});
