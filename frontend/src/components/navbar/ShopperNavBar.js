import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SearchInput } from "../input/SearchInput";
import { OptionSelect } from "../select/OptionSelect";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 40,
  },
}));

export default function ShopperNavBar({ isSearchPage }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" spacing={4}>
          <Grid item>
            <Button color="inherit" href="/">
              <Typography variant="h1">localink</Typography>
            </Button>
          </Grid>
          {isSearchPage ? (
            <>
              <Grid item>
                <SearchInput />
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={2}
                >
                  <Grid item>Sort by: </Grid>
                  <Grid item>
                    <OptionSelect />
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid item xs={6} />
          )}
          <Grid item>
            <Button color="inherit" component={Link} to="/business">
              sell on localink
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" component={Link} to="/signup">
              Sign up
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" component={Link} to="/login">
              Log in
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
