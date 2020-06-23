import React from "react";
import ShopperLandingPage from "./pages/shopper/LandingPage";
import ShopperLogInPage from "./pages/shopper/LogInPage";
import ShopperSignUpPage from "./pages/shopper/SignUpPage";
import ShopperSearchPage from "./pages/shopper/SearchPage";
import ShopperProfilePage from "./pages/shopper/ProfilePage";
import ShopperCataloguePage from "./pages/shopper/CataloguePage";
import ChatPage from "./pages/ChatPage";
import ShopperNavBar from "./components/navbar/ShopperNavBar";
import Alert from "./components/Alert";
import { Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

function AppShopper() {
  let location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column">
        <ShopperNavBar isSearchPage={location.pathname === "/search"} />
        <Grid item xs={8}></Grid>
        <Grid item xs={12} sm={12}>
          <Alert />
          <Route exact path="/login" component={ShopperLogInPage} />
          <Route exact path="/signup" component={ShopperSignUpPage} />
          <Route exact path="/search" component={ShopperSearchPage} />
          <Route exact path="/profile" component={ShopperProfilePage} />
          <Route exact path="/catalogue" component={ShopperCataloguePage} />
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/" render={ShopperLandingPage} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AppShopper;
