import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ShopperLandingPage from "./pages/shopper/LandingPage";
import ShopperLogInPage from "./pages/shopper/LogInPage";
import ShopperSignUpPage from "./pages/shopper/SignUpPage";
import ShopperSearchPage from "./pages/shopper/SearchPage";
import ShopperProfilePage from "./pages/shopper/ProfilePage";
import ShopperCataloguePage from "./pages/shopper/CataloguePage";
import ChatPage from "./pages/ChatPage";
import ShopperNavBar from "./components/navbar/ShopperNavBar";
// import Alert from "./components/Alert";
import { Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { updateIsShopper } from "./actions/pageActions";

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

function AppShopper() {
  let location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateIsShopper(true));
  }, [dispatch]);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <div className={classes.navBar}>
          <ShopperNavBar isSearchPage={location.pathname === "/search"} />
        </div>
        <div className={classes.content}>
          <Route exact path="/login" component={ShopperLogInPage} />
          <Route exact path="/signup" component={ShopperSignUpPage} />
          <Route exact path="/search" component={ShopperSearchPage} />
          <Route exact path="/profile" component={ShopperProfilePage} />
          <Route exact path="/catalogue" component={ShopperCataloguePage} />
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/" component={ShopperLandingPage} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppShopper;
