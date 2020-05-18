import React from "react";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import CataloguePage from "./pages/CataloguePage";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <Alert />
            <Switch>
              <Route exact path="/login" component={LogInPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/catalogue" component={CataloguePage} />
              <Route exact path="/" component={LandingPage} />
            </Switch>
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
      </Grid>
    </Router>
  );
}
// function App() {
//   return <NavBar> </NavBar>;
// }

export default App;
