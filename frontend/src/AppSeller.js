import React from "react";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerProfilePage from "./pages/seller/ProfilePage";
import SellerDashboardPage from "./pages/seller/DashboardPage";
import NavBar from "./components/navbar/NavBar";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import PrivateRoute from "./routing/PrivateRoute";
import ProductTable from "./components/table/ProductTable";
import { useSelector } from "react-redux";

function AppSeller() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/business/dashboard" />;
  }
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
              <Route
                exact
                path="/business/dashboard"
                component={SellerDashboardPage}
              />
              <Route
                exact
                path="/business/product/manage"
                component={ProductTable}
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
