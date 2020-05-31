import React from 'react';
import ShopperLandingPage from './pages/shopper/LandingPage';
import ShopperLogInPage from './pages/shopper/LogInPage';
import ShopperSignUpPage from './pages/shopper/SignUpPage';
import ShopperSearchPage from './pages/shopper/SearchPage';
import ShopperProfilePage from './pages/shopper/ProfilePage';
import ShopperCataloguePage from './pages/shopper/CataloguePage';
import LoggedShopperNavBar from './components/navbar/LoggedShopperNavBar';
import ShopperNavBar from './components/navbar/ShopperNavBar';
import Alert from './components/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PrivateRoute from './routing/PrivateRoute';
import { useSelector } from 'react-redux';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

function AppShopper() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='column'>
        {isAuthenticated ? <LoggedShopperNavBar /> : <ShopperNavBar />}
        <Grid item></Grid>
        <Grid item xs={8}></Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <Alert />
            {/* <Router>
            <Switch> */}
            <Route exact path='/login' component={ShopperLogInPage} />
            <Route exact path='/signup' component={ShopperSignUpPage} />
            <Route exact path='/search' component={ShopperSearchPage} />
            <Route exact path='/profile' component={ShopperProfilePage} />
            <Route exact path='/catalogue' component={ShopperCataloguePage} />
            <Route exact path='/' component={ShopperLandingPage} />
            {/* </Switch>
          </Router> */}
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AppShopper;
