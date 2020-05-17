import React from "react";
//components
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import NavBar from "./components/NavBar";
//routes
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//stylings
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Grid container direction="column">
            <NavBar>
              <Switch>
                <Route exact path="/logIn" component={LogInPage} />
                <Route exact path="/signUp" component={SignUpPage} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/" component={LandingPage} />
              </Switch>
            </NavBar>
          </Grid>
        </div>
      </Router>
    </ThemeProvider>
  );
}
