import React from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const profile = useSelector((state) => state.profile);
};

export default DashboardPage;
