import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ItemCard } from "../card/ItemCard";

export const LocationList = () => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {({ index, style }) => {
          return <ItemCard />;
        }}
      </List>
    )}
  </AutoSizer>
);
