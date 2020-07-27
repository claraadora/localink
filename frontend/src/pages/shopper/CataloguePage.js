import React, { useState, useEffect } from "react";
import ProductCard from "../../components/card/ProductCard";
import ReviewCard from "../../components/card/ReviewCard";
import {
  Grid,
  CircularProgress,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import productList from "../../sample/productList.json";
import { useSelector, useDispatch } from "react-redux";
import { ShopfrontHeader } from "../../components/header/ShopfrontHeader";
import { Shop } from "@material-ui/icons";
import { fetchShop } from "../../actions/shopper/catalogueActions";
import { TabPanel, a11yProps } from "../../components/tabs/TabPanel";
import { mergeClasses } from "@material-ui/styles";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: lightGreen[500],
  },
  tabs: {
    color: lightGreen[500],
  },
}));

const CataloguePage = (props) => {
  const dispatch = useDispatch();
  const catalogueSelector = useSelector((state) => state.catalogue);
  const [shop, setShop] = useState(null);
  const loading = catalogueSelector.loading;
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(fetchShop(props.shopId));
  }, []);

  useEffect(() => {
    setShop(catalogueSelector.currShop);
  }, [dispatch, catalogueSelector]);

  if (loading) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100%", width: "100%" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else {
    if (shop !== null) {
      const currShop = shop.data;
      const [name, description, address, avatar, ratings, products, reviews] = [
        currShop.shopName,
        currShop.description,
        currShop.address,
        currShop.avatar,
        currShop.ratings,
        currShop.products,
        currShop.reviews,
      ];

      return (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{ width: "100vw" }}
        >
          <Grid item container className={classes.header}>
            <ShopfrontHeader
              name={name}
              description={description}
              address={address}
              avatar={avatar}
              ratings={ratings}
            />
          </Grid>

          {/** APP BAR FOR TABS */}
          <Grid item container>
            <AppBar position="static" className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                centered
              >
                <Tab label="All Products" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
          </Grid>

          {/** PRODUCTS */}

          <TabPanel value={value} index={0} style={{ width: "100vw" }}>
            <Grid item container style={{ width: "100vw" }}>
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
          </TabPanel>

          {/** REVIEWS */}
          <TabPanel value={value} index={1}>
            <Grid item container style={{ width: "100vw" }}>
              <Grid item md={2} />
              <Grid item container md={8} spacing={2}>
                {reviews.map((review) => (
                  <Grid item container md={2}>
                    <ReviewCard review={review} />
                  </Grid>
                ))}
              </Grid>
              <Grid item md={2} />
            </Grid>
          </TabPanel>
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "100%", width: "100%" }}
        >
          <Grid item>
            <Typography variant="h4">
              The shop that you're looking for can't be found :(
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }
};

export default CataloguePage;
