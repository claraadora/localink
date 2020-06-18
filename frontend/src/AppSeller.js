import React from "react";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerDashboardPage from "./pages/seller/DashboardPage";
import LoggedSellerNavBar from "./components/navbar/LoggedSellerNavBar";
import SellerNavBar from "./components/navbar/SellerNavBar";
import Alert from "./components/Alert";
import { Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import ProductTable from "./components/table/ProductTable";
import ProductForm from "./components/form/ProductForm";
import ProfileForm from "./components/form/ProfileForm";
import AccountSettings from "./components/tabs/AccountSettings";
import { useSelector } from "react-redux";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";
import ReviewTable from "./components/table/ReviewTable";

function AppSeller() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // if (isAuthenticated) {
  //   return <Redirect to="/business/dashboard" />;
  // }

  return (
    <ThemeProvider theme={themeSeller}>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          {isAuthenticated ? <LoggedSellerNavBar /> : <SellerNavBar />}
        </Grid>
        <Grid item />
        <Grid item container direction="row" spacing={5}>
          <Grid item xs={10} />
          <Grid item>
            <Alert />
          </Grid>
          <Grid item container>
            <Grid item xs={3} sm={2} />
            <Grid item xs={8} sm={9}>
              <Route exact path="/business/login" component={SellerLogInPage} />
              <Route
                exact
                path="/business/signup"
                component={SellerSignUpPage}
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
              <Route
                exact
                path="/business/product/add"
                component={ProductForm}
              />
              <Route exact path="/business/review" component={ReviewTable} />
            </Grid>
            <Grid item xs={1} sm={1} />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AppSeller;
