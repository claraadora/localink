import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ItemCard } from "../card/ItemCard";
import { useSelector } from "react-redux";

export const LocationList = () => {
  const productArray = useSelector((state) => state.search.productArray);
  const loading = useSelector((state) => state.search.loading);

  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (!loading && productArray) {
      console.log("Search result is " + productArray);
      setSearchResult(productArray);
    }
  }, [loading, productArray]);

  if (searchResult == null) {
    return null;
  } else {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={searchResult.length}
            itemSize={125}
            width={width}
          >
            {({ index, style }) => {
              return <ItemCard style={style} content={searchResult[index]} />;
            }}
          </List>
        )}
      </AutoSizer>
    );
  }
};
