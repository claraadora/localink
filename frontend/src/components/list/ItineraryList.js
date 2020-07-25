import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { reorderItinerary } from "../../actions/shopper/itineraryActions";
import { ItineraryCard } from "../card/ItineraryCard";
import { lightBlue, lightGreen } from "@material-ui/core/colors";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Paper, IconButton, Grid } from "@material-ui/core";
import { loadRoute } from "../../actions/shopper/searchActions";
import { mergeClasses } from "@material-ui/styles";
import { ItineraryHeader } from "../header/ItineraryHeader";

const grid = 8;
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
  margin: `0 0 0 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? lightGreen[100] : lightBlue[50],
  display: "flex",
  overflow: "auto",
  width: "100%",
});

// const getButtonStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? lightGreen[100] : lightBlue[50],
//   display: "flex",
//   overflow: "auto",
//   width: "95%",
// });

export const ItineraryList = () => {
  const itineraryItems = useSelector((state) => state.itinerary.itineraryArray);
  const loading = useSelector((state) => state.itinerary.loading);
  const [itinerary, setItinerary] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading && itinerary) {
      setItinerary(itineraryItems);
    }
  }, [itineraryItems, itinerary, loading]);

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
  return (
    <Grid
      container
      direction="column"
      style={{ height: "100%", width: "100%" }}
      spacing={1}
    >
      <Grid item container>
        <ItineraryHeader />
      </Grid>
      <Grid item>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {itineraryItems.map((item, index) => (
                  <Draggable
                    key={item.name}
                    draggableId={item.name}
                    index={index}
                  >
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
                        <ItineraryCard content={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};
