import React from "react";
import ProductCard from "../components/ProductCard";
import { Grid } from "@material-ui/core";
import productList from "../sample/productList.json";

const CataloguePage = () => {
  const makeProductCard = (product) => {
    return (
      <Grid item xs={12} sm={2}>
        <ProductCard {...product} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      {productList.map((product) => makeProductCard(product))}
    </Grid>
  );
};

export default CataloguePage;
