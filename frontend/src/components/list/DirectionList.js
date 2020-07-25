import React, { useState, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { DirectionCard } from "../card/DirectionCard";
import { useSelector } from "react-redux";

export const DirectionList = () => {
  const search = useSelector((state) => state.search);
  const renderRoute = useSelector((state) => state.search.renderRoute);
  const [legs, setLegs] = useState(search.directionSteps.legs);
  const [itemSizes, setItemSizes] = useState([]);
  useEffect(() => {
    let tempLegs = search.directionSteps.legs;
    let temp = [];

    setLegs(tempLegs);

    for (let i = 0; i < tempLegs.length; i++) {
      temp.push(tempLegs[i].steps.length * 55);
    }

    setItemSizes(temp);
  }, [search]);

  const getItemSize = (index) => {
    return itemSizes[index];
  };

  if (renderRoute && legs) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={legs.length}
            itemSize={getItemSize}
            width={width}
          >
            {({ index, style }) => {
              return (
                <DirectionCard
                  style={style}
                  leg={
                    index < legs.length
                      ? legs[index]
                      : legs[legs.length - 1].end_address
                  }
                  last={index < legs.length ? false : true}
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
