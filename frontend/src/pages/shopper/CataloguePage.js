import React from "react";
import ProductCard from "../../components/card/ProductCard";
import { Grid, Typography } from "@material-ui/core";
import productList from "../../sample/productList.json";

const CataloguePage = () => {
  const makeProductCard = (product) => {
    return (
      <Grid item xs={12} sm={2}>
        <ProductCard {...product} />
      </Grid>
    );
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
      spacing={2}
    >
      <Grid item>
        <Typography variant="h7" color="textPrimary" gutterBottom>
          Local shopping made fun and easy!
        </Typography>
      </Grid>
      <Grid item container direction="row" md={10}>
        <Grid item md={2} />
        <Grid item container md={8}>
          {productList.map((product) => makeProductCard(product))}
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Grid>
  );
};

export default CataloguePage;
