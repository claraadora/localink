import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { LocationCard } from "../card/LocationCard";
import "./styles.css";

const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

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
        {Row}
      </List>
    )}
  </AutoSizer>
);
