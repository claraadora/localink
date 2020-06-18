import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: 10,
    width: "200px",
  },
  title: {
    fontSize: 14,
    color: theme.palette.secondary,
  },
  pos: {
    marginBottom: 12,
  },
}));

function trimString(word, maxLength) {
  return word <= maxLength ? word : word.substring(0, maxLength - 3) + "...";
}

export const ItineraryCard = (props) => {
  const classes = useStyles();
  const data = props.content;

  return (
    <Card className={classes.root}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={1} />
        <Grid item xs={8} container direction="column" justify="center">
          <Grid item>
            <Typography variant="h6">{trimString(data.name, 15)}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {data.shop_docs[0].shopName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {trimString(data.shop_docs[0].address, 20)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" component="p">
            ${data.price}
          </Typography>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Card>
  );
};
