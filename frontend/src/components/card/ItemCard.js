import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

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
      style={{ ...props.style, padding: "10px 10px 10px 20px" }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item xs={10} container direction="column">
          <Grid item>
            <Typography variant="h5" component="h2">
              product name
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p">
              shop name
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body2" component="p">
              shop address
            </Typography>
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
