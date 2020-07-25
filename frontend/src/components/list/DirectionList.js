import React, { useState, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { DirectionCard } from "../card/DirectionCard";
import { useSelector } from "react-redux";

export const DirectionList = () => {
  const search = useSelector((state) => state.search);
  const renderRoute = useSelector((state) => state.search.renderRoute);
  const [steps, setSteps] = useState(search.directionSteps.steps);

  useEffect(() => {
    setSteps(search.directionSteps.steps);
  }, [search]);

  const getItemSize = () => {
    const numOfSteps = steps.length;
    return (numOfSteps + 1) * 53;
  };

  if (renderRoute && steps) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={1}
            itemSize={getItemSize}
            width={width}
          >
            {({ index, style }) => {
              return (
                <DirectionCard
                  style={style}
                  content={steps}
                  last={false}
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
