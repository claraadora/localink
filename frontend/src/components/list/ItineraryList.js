import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AutoSizer from "react-virtualized-auto-sizer";
import { useSelector, useDispatch } from "react-redux";
import { reorderItinerary } from "../../actions/shopper/itineraryActions";

const grid = 20;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  overflow: "auto",
});

export const ItineraryList = () => {
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const loading = useSelector((state) => state.itinerary.loading);
  const [itinerary, setItinerary] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading && itinerary) {
      setItinerary(itineraryItems);
    }
  }, [itineraryItems]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      itineraryItems,
      result.source.index,
      result.destination.index
    );

    dispatch(reorderItinerary(items));
    setItinerary(items);
  };

  if (itineraryItems == null) {
    return null;
  }

  return (
    // {<AutoSizer>
    //   {({ height, width }) => }
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {itineraryItems.map((item, index) => (
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {console.log("name" + item.name)}
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    //   )}
    // </AutoSizer>
  );
};
