import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ItemCard, ShopCard } from "../card/ItemCard";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    outline: "0.01% none black",
  },
}));

export const LocationList = () => {
  const productArray = useSelector((state) => state.search.productArray);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (productArray == null) {
    return null;
  } else {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={productArray.length}
            itemSize={125}
            width={width}
          >
            {({ index, style }) => {
              return (
                <div>
                  <ItemCard
                    style={style}
                    content={productArray[index]}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  />
                </div>
              );
            }}
          </List>
        )}
      </AutoSizer>
    );
  }
};
