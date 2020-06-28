import React from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { DirectionCard } from "../card/DirectionCard";
import { useSelector } from "react-redux";

export const DirectionList = () => {
  const directionSteps = useSelector((state) => state.search.directionSteps);
  const renderRoute = useSelector((state) => state.search.renderRoute);

  const getItemSize = (index) => {
    if (index < directionSteps.length) {
      const numOfSteps = directionSteps[index].steps.length;
      return (numOfSteps + 1) * 53;
    } else {
      return 30;
    }
  };

  if (renderRoute && directionSteps && directionSteps.length > 0) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={directionSteps.length + 1}
            itemSize={getItemSize}
            width={width}
          >
            {({ index, style }) => {
              return (
                <DirectionCard
                  style={style}
                  content={
                    index < directionSteps.length
                      ? directionSteps[index]
                      : directionSteps[directionSteps.length - 1].end_address
                  }
                  last={index < directionSteps.length ? false : true}
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
