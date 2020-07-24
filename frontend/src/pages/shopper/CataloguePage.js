import React, { useState, useEffect } from "react";
import ProductCard from "../../components/card/ProductCard";
import { Grid, Typography } from "@material-ui/core";
import productList from "../../sample/productList.json";
import { useSelector, useDispatch } from "react-redux";
import { ShopfrontHeader } from "../../components/header/ShopfrontHeader";
import { Shop } from "@material-ui/icons";
import { fetchShop } from "../../actions/shopper/catalogueActions";

const CataloguePage = (props) => {
  const dispatch = useDispatch();
  const catalogueSelector = useSelector((state) => state.catalogue);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchShop(props.shopId));
  }, []);

  useEffect(() => {
    if (catalogueSelector !== null) {
      setLoading(catalogueSelector.loading);
      setShop(catalogueSelector.currShop);
    }
  }, [dispatch, catalogueSelector]);

  if (shop === null) {
    return null;
  } else {
    const currShop = shop.data;
    const [name, description, address, avatar, ratings, products] = [
      currShop.shopName,
      currShop.description,
      currShop.address,
      currShop.avatar,
      currShop.ratings,
      currShop.products,
    ];

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ width: "100%" }}
        spacing={2}
      >
        <Grid item container>
          <ShopfrontHeader
            name={name}
            description={description}
            address={address}
            avatar={avatar}
            ratings={ratings}
          />
        </Grid>
        <Grid item container>
          <Grid item md={2} />
          <Grid item container md={8} spacing={2}>
            {products.map((product) => (
              <Grid item container md={2}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Grid>
    );
  }
};

export default CataloguePage;
