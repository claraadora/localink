import React from "react";
import { FixedSizeList as List } from "react-window";

import { LocationCard } from "../card/LocationCard";

const Row = ({ index }) => <div>Row {index}</div>;

export const LocationList = () => (
  <List height={400} itemCount={1000} itemSize={35} width="100%">
    {Row}
  </List>
);
