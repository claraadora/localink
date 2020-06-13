import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    fontSize: 14,
    color: theme.palette.secondary,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const ItemCard = (props) => {
  const classes = useStyles();
  console.log(props.style);

  return (
    <Card
      className={classes.root}
      style={{ ...props.style, padding: "10px 0px 2px 0px" }}
    >
      <Grid container direction="row" alignItems="center">
        <Grid item xs={1} />
        <Grid item xs={9} container direction="column" justify="center">
          <Grid item>
            <Typography variant="h5">product name</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">shop name</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">shop address</Typography>
          </Grid>
          <Grid item>
            <Button size="small">Add to Itinerary</Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" component="p">
            $5
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
