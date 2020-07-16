import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ItemCard } from "../card/ItemCard";
import { useSelector } from "react-redux";

export const LocationList = () => {
  const productArray = useSelector((state) => state.search.productArray);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
