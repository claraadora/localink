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

function trimString(word, maxLength) {
  return word <= maxLength ? word : word.substring(0, maxLength - 3) + "...";
}

export const ItemCard = (props) => {
  const classes = useStyles();
  const data = props.content;
  console.log(props.style);
  console.log(data);
  return (
    <Card
      className={classes.root}
      style={{ ...props.style, padding: "10px 0px 2px 0px" }}
    >
      <Grid container direction="row" alignItems="center">
        <Grid item xs={1} />
        <Grid item xs={9} container direction="column" justify="center">
          <Grid item>
            <Typography variant="h6">{trimString(data.name, 30)}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {data.shop_docs[0].shopName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{data.shop_docs[0].address}</Typography>
          </Grid>
          <Grid item>
            <Button size="small">Add to Itinerary</Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" component="p">
            {data.price}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
