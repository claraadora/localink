import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, Grid } from "@material-ui/core";
import {
  addToItinerary,
  removeFromItinerary,
} from "../../actions/shopper/itineraryActions";
import { useSelector, useDispatch } from "react-redux";
import Popover from "@material-ui/core/Popover";
import { addChatItem } from "../../actions/chatActions";

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
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    zIndex: 1000,
  },
}));

function trimString(word, maxLength) {
  return word <= maxLength ? word : word.substring(0, maxLength - 3) + "...";
}

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
  const [isAdded, setIsAdded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userId = useSelector((state) => state.auth.user._id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handlePopoverOpen = (event) => {
    console.log("WHERE");
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Card
        className={classes.root}
        style={{ ...props.style, padding: "10px 0px 2px 0px" }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1} />
          <Grid item xs={9} container direction="column" justify="center">
            <Grid item>
              <Typography variant="h6">{trimString(data.name, 25)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {data.shop_docs[0].shopName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {data.shop_docs[0].address}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={() => {
                  dispatch(
                    isAdded
                      ? removeFromItinerary(data._id)
                      : addToItinerary(data)
                  );
                  setIsAdded(!isAdded);
                }}
              >
                {isAdded ? "Remove from Itinerary" : "Add to Itinerary"}
              </Button>
              {isAuthenticated ? (
                <Button
                  size="small"
                  onClick={() =>
                    dispatch(addChatItem(data.shop_docs[0]._id, userId, true))
                  }
                >
                  Ask Seller
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" component="p">
              {sortedBy === "price"
                ? `$${data.price}`
                : sortedBy === "ratings"
                ? Math.round(data.shop_docs[0].ratings * 10) / 10
                : trimDistance(data.shop_docs[0].distance)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
