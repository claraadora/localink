import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { SearchInput } from "../input/SearchInput";
import { OptionSelect } from "../select/OptionSelect";
import { TravelSelect } from "../select/TravelSelect";
import { ManualLocationDialog } from "../dialog/ManualLocationDialog";

const useStyles = makeStyles({
  paper: {
    padding: "0.5% 0.5% 0.5% 0.5%",
  },
});

export const SearchNavBar = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        spacing={3}
        justify="center"
        alignItems="center"
      >
        {/*SEARCH INPUT*/}
        <Grid item md={6}>
          <SearchInput />
        </Grid>
        <Grid container item md={6} justify="center" alignItems="center">
          <Grid item md={5}>
            <OptionSelect />
          </Grid>
          <Grid item md={5}>
            <TravelSelect />
          </Grid>
          <Grid item md={1}>
            <ManualLocationDialog />
          </Grid>
          <Grid item md={1} />
        </Grid>
      </Grid>
    </Paper>
  );
};
