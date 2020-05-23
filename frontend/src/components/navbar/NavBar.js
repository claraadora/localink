import React from "react";
import LoggedShopperNavBar from "./LoggedShopperNavBar";
import LoggedSellerNavBar from "./LoggedSellerNavBar";
import ShopperNavBar from "./ShopperNavBar";
import SellerNavBar from "./SellerNavBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isShopper = useSelector((state) => state.isShopper);

  if (isShopper) {
    if (isAuthenticated) {
      return <LoggedShopperNavBar />;
    } else {
      return <ShopperNavBar />;
    }
  } else {
    if (isAuthenticated) {
      return <LoggedSellerNavBar />;
    } else {
      return <LoggedSellerNavBar />;
    }
  }
};

export default NavBar;
