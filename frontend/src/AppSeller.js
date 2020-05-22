import React from "react";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerProfilePage from "./pages/seller/ProfilePage";
import NavBar from "./components/navbar/NavBar";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import PrivateRoute from "./routing/PrivateRoute";

function AppSeller() {
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <NavBar isShopper={false} />
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <Alert />
            <Switch>
              <Route exact path="/business/login" component={SellerLogInPage} />
              <Route
                exact
                path="/business/signup"
                component={SellerSignUpPage}
              />
              <Route
                exact
                path="/business/profile"
                component={SellerProfilePage}
              />
              <Route exact path="/business/" component={SellerLandingPage} />
              <PrivateRoute
                exact
                path="/business/dashboard"
                component={SellerLandingPage}
              />
            </Switch>
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
      </Grid>
    </Router>
  );
}

export default AppSeller;
