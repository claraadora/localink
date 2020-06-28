import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { DirectionCard } from "../card/DirectionCard";
import { useSelector } from "react-redux";

export const DirectionList = () => {
  const directionSteps = useSelector((state) => state.search.directionSteps);
  const renderRoute = useSelector((state) => state.search.renderRoute);

  if (renderRoute && directionSteps && directionSteps.length > 0) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={directionSteps.length}
            itemSize={400}
            width={width}
          >
            {({ index, style }) => {
              return (
                <DirectionCard
                  style={style}
                  content={directionSteps[index]}
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
