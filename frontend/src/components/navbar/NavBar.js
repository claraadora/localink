import React from "react";
import LoggedShopperNavBar from "./LoggedShopperNavBar";
import LoggedSellerNavBar from "./LoggedSellerNavBar";
import ShopperNavBar from "./ShopperNavBar";
import SellerNavBar from "./SellerNavBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isShopper = useSelector((state) => state.isShopper);

  if (isShopper) {
    if (isLoggedIn) {
      return <LoggedShopperNavBar />;
    } else {
      return <ShopperNavBar />;
    }
  } else {
    if (isLoggedIn) {
      return <LoggedSellerNavBar />;
    } else {
      return <SellerNavBar />;
    }
  }
};

export default NavBar;
