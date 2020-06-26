import React from "react";
import { ItineraryList } from "../list/ItineraryList";
import { ItineraryHeader } from "../header/ItineraryHeader";

export const Itinerary = () => {
  return (
    <div>
      <ItineraryHeader />
      <ItineraryList />
    </div>
  );
};
