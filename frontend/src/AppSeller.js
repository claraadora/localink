import React from "react";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerDashboardPage from "./pages/seller/DashboardPage";
import LoggedSellerNavBar from "./components/navbar/LoggedSellerNavBar";
import SellerNavBar from "./components/navbar/SellerNavBar";
import Alert from "./components/Alert";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import PrivateRoute from "./routing/PrivateRoute";
import ProductTable from "./components/table/ProductTable";
import ProductForm from "./components/form/ProductForm";
import ProfileForm from "./components/form/ProfileForm";
import AccountSettings from "./components/tabs/AccountSettings";
import { useSelector } from "react-redux";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";

function AppSeller() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // if (isAuthenticated) {
  //   return <Redirect to="/business/dashboard" />;
  // }

  return (
    <ThemeProvider theme={themeSeller}>
      <Grid container direction="column">
        {isAuthenticated ? <LoggedSellerNavBar /> : <SellerNavBar />}
        <Grid item xs={8}></Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <Alert />
            {/* <Router>
            <Switch> */}
            <Route exact path="/business/login" component={SellerLogInPage} />
            <Route exact path="/business/signup" component={SellerSignUpPage} />
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
            <Route
              exact
              path="/business/account/profile"
              component={ProfileForm}
            />
            <Route
              exact
              path="/business/account/settings"
              component={AccountSettings}
            />
            <Route exact path="/business/product/add" component={ProductForm} />
            {/* </Switch>
          </Router> */}
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AppSeller;
