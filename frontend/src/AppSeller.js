import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerLandingPage from "./pages/seller/LandingPage";
import SellerLogInPage from "./pages/seller/LogInPage";
import SellerSignUpPage from "./pages/seller/SignUpPage";
import SellerDashboardPage from "./pages/seller/DashboardPage";
import SellerNavBar from "./components/navbar/SellerNavBar";
import LocalinkAlert from "./components/Alert";
import { Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import ProductTable from "./components/table/ProductTable";
import UserTable from "./components/table/UserTable";
import ProductForm from "./components/form/ProductForm";
import ProfileForm from "./components/form/ProfileForm";
import UserForm from "./components/form/UserForm";
import AccountSettings from "./components/tabs/AccountSettings";
import { themeSeller } from "./themeSeller";
import { ThemeProvider } from "@material-ui/core/styles";
import ReviewTable from "./components/table/ReviewTable";
import { updateIsShopper } from "./actions/pageActions";
import LandingPage from "./pages/seller/LandingPage";
import { LocalinkDrawer } from "./components/drawer/Drawer";
import { ChatPage } from "./pages/ChatPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useLocation } from "react-router-dom";

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
  alert: {
    position: "absolute",
    top: "100px",
    width: "100%",
  },
});

<<<<<<< HEAD
const getLastTwo = str => {
  const arr = str.split('/');
  return `${arr[3]}/${arr[4]}`;
=======
const getLastTwo = (str) => {
  const arr = str.split("/");
  return `${arr[2]}/${arr[3]}`;
>>>>>>> 74d14ae1019485388a9f89942d2865edc676fdab
};

function AppSeller() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  let location = useLocation();

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
        <div className={classes.alert}>
          <LocalinkAlert />
        </div>
        <div className={classes.content}>
          {isAuthenticated && <LocalinkDrawer />}
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
          <Route exact path="/business/users/manage" component={UserTable} />
          <Route
            exact
            path="/business/account/profile"
            component={ProfileForm}
          />
          <Route exact path="/business/users/add" component={UserForm} />
          <Route
            exact
            path="/business/account/settings"
            component={AccountSettings}
          />
          <Route exact path="/business/product/add" component={ProductForm} />
          <Route exact path="/business/review" component={ReviewTable} />
          <Route exact path="/business/chat" component={ChatPage} />
          <Route
            exact
            path="/business/forgot-password"
            component={ForgotPasswordPage}
          />
          <Route
            path="/business/reset-password"
            render={() => (
              <ResetPasswordPage segment={getLastTwo(location.pathname)} />
            )}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppSeller;
