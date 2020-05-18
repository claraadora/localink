import { createMuiTheme } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import yellow from "@material-ui/core/colors/yellow";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen[300],
    },
    secondary: {
      main: yellow[300],
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
