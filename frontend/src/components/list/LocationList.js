import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ItemCard } from "../card/ItemCard";
import { useSelector } from "react-redux";

export const LocationList = () => {
  const searchResult = useSelector((state) => state.search.search);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={1000}
          itemSize={120}
          width={width}
        >
          {({ index, style }) => {
            return <ItemCard style={style} />;
          }}
        </List>
      )}
    </AutoSizer>
  );
};
