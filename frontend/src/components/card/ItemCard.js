import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, Grid } from "@material-ui/core";
import {
  addToItinerary,
  removeFromItinerary,
} from "../../actions/shopper/itineraryActions";
import { useSelector, useDispatch } from "react-redux";
import { addChatItem } from "../../actions/chatActions";
import { fetchShop } from "../../actions/shopper/catalogueActions";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import itinerary from "../../reducers/itineraryReducers";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    fontSize: 14,
    color: theme.palette.secondary,
  },
}));

function trimDistance(distance) {
  if (distance > 1000) {
    return `${Math.round(distance / 1000)} km`;
  } else {
    return `${distance} m`;
  }
}

export const ItemCard = (props) => {
  const classes = useStyles();
  const data = props.content;
  const dispatch = useDispatch();
  const sortedBy = useSelector((state) => state.search.sortedBy);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const loading = useSelector((state) => state.search.loading);
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const handlePopoverOpen = (event) => {
    console.log("WHERE");
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleFetchShop = () => {
    let shopId = data.shop_docs[0]._id;
    dispatch(fetchShop(shopId));
    history.push(`/catalogue/${shopId}`);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Card
        className={classes.root}
        style={{
          ...props.style,
          padding: "10px 0px 2px 0px",
          outline: "1px solid silver",
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1} />
          <Grid item xs={8} container direction="row" alignItems="center">
            <Grid item md={11}>
              <Typography noWrap variant="h6">
                {!loading ? data.name : <Skeleton />}
              </Typography>
            </Grid>
            <Grid item md={11}>
              <Typography noWrap variant="body2">
                {!loading ? data.shop_docs[0].shopName : <Skeleton />}
              </Typography>
            </Grid>
            <Grid item md={11}>
              <Typography noWrap variant="body2">
                {!loading ? data.shop_docs[0].address : <Skeleton />}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                disabled={loading}
                onClick={() => {
                  if (itineraryItems.includes(data)) {
                    console.log("included");
                    dispatch(removeFromItinerary(data._id));
                  } else {
                    dispatch(addToItinerary(data));
                  }
                }}
              >
                {itineraryItems.includes(data) ? "Remove" : "Add to Itinerary"}
              </Button>
              {isAuthenticated ? (
                <Button
                  disabled={loading}
                  size="small"
                  onClick={() =>
                    dispatch(
                      addChatItem(data.shop_docs[0]._id, auth.user._id, true)
                    )
                  }
                >
                  Ask Seller
                </Button>
              ) : null}
              <Button size="small" onClick={handleFetchShop} disabled={loading}>
                Go to Shop
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" component="p">
              {loading ? (
                <Skeleton />
              ) : sortedBy === "price" ? (
                `$${data.price}`
              ) : sortedBy === "ratings" ? (
                Math.round(data.shop_docs[0].ratings * 10) / 10
              ) : (
                trimDistance(data.shop_docs[0].distance)
              )}
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Card>
    </div>
  );
};
