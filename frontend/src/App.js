import React from "react";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            {/* <Switch>
              <Route exact path="/logIn" component={LogInPage} />
              <Route exact path="/signUp" component={SignUpPage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/" component={LandingPage} />
            </Switch> */}
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
      </Grid>
    </Router>
  );
}
// function App() {
//   return <NavBar> </NavBar>;
// }

export default App;
