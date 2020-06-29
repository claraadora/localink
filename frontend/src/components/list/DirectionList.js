import React, { useState, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { DirectionCard } from "../card/DirectionCard";
import { useSelector } from "react-redux";

export const DirectionList = () => {
  const search = useSelector((state) => state.search);
  const renderRoute = useSelector((state) => state.search.renderRoute);
  const [dirSteps, setDirSteps] = useState(search.directionSteps);

  useEffect(() => {
    console.log("changed");
    setDirSteps(search.directionSteps);
  }, [search]);

  const getItemSize = (index) => {
    if (index < dirSteps.length) {
      const numOfSteps = dirSteps[index].steps.length;
      return (numOfSteps + 1) * 53;
    } else {
      return 30;
    }
  };

  if (renderRoute && dirSteps && dirSteps.length > 0) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={dirSteps.length + 1}
            itemSize={getItemSize}
            width={width}
          >
            {({ index, style }) => {
              return (
                <DirectionCard
                  style={style}
                  content={
                    index < dirSteps.length
                      ? dirSteps[index]
                      : dirSteps[dirSteps.length - 1].end_address
                  }
                  last={index < dirSteps.length ? false : true}
                  nth={index}
                  id={`direction-list-${index}`}
                />
              );
            }}
          </List>
        )}
      </AutoSizer>
    );
  } else {
    return null;
  }
};
