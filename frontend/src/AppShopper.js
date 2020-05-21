import React from "react";

import ShopperLandingPage from "./pages/shopper/LandingPage";
import ShopperLogInPage from "./pages/shopper/LogInPage";
import ShopperSignUpPage from "./pages/shopper/SignUpPage";
import ShopperSearchPage from "./pages/shopper/SearchPage";
import ShopperProfilePage from "./pages/shopper/ProfilePage";
import ShopperCataloguePage from "./pages/shopper/CataloguePage";
import NavBar from "./components/navbar/NavBar";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

function AppShopper() {
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
              <Route exact path="/login" component={ShopperLogInPage} />
              <Route exact path="/signup" component={ShopperSignUpPage} />
              <Route exact path="/search" component={ShopperSearchPage} />
              <Route exact path="/profile" component={ShopperProfilePage} />
              <Route exact path="/catalogue" component={ShopperCataloguePage} />
              <Route exact path="/" component={ShopperLandingPage} />
            </Switch>
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
      </Grid>
    </Router>
  );
}

export default AppShopper;