import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerDashboardPage from "./pages/seller/DashboardPage";
import SellerNavBar from "./components/navbar/SellerNavBar";
import Alert from "./components/Alert";
import { Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import ProductTable from "./components/table/ProductTable";
import ProductForm from "./components/form/ProductForm";
import ProfileForm from "./components/form/ProfileForm";
import AccountSettings from "./components/tabs/AccountSettings";
import { useSelector } from "react-redux";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";
import ReviewTable from "./components/table/ReviewTable";
import { updateIsShopper } from "./actions/pageActions";
import LandingPage from "./pages/seller/LandingPage";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  navBar: {
    width: "100%",
  },
});
function AppSeller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateIsShopper(false));
  }, [dispatch]);
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeSeller}>
      <div className={classes.main}>
        <div className={classes.navBar}>
          <SellerNavBar />
        </div>
        <div className={classes.content}>
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
          <Route exact path="/business/review" component={ReviewTable} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppSeller;
