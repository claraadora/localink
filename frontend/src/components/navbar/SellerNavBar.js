import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SellerNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" spacing={2} md={12} alignItems="center">
          <Grid item md={1} xs={0} />
          <Grid item container justify="flex-start" md={2} xs={2}>
            <Button color="inherit" href="/business">
              <Grid
                item
                container
                direction="row"
                alignItems="flex-end"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="h1">localink</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">for sellers</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item md={5} xs={0} />
          <Grid item container md={4} xs={8} justify="space-around">
            <Grid item>
              <Button color="inherit" component={Link} to="/">
                Shop on localink
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" component={Link} to="/business/signup">
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" component={Link} to="/business/login">
                Log In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
