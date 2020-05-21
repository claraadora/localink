import React from "react";
import LoggedShopperNavBar from "./LoggedShopperNavBar";
import LoggedSellerNavBar from "./LoggedSellerNavBar";
import ShopperNavBar from "./ShopperNavBar";
import SellerNavBar from "./SellerNavBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLogged = useSelector((state) => state.isLogged);
  const isShopper = useSelector((state) => state.isShopper);

  if (isShopper) {
    if (isLogged) {
      return <LoggedShopperNavBar />;
    } else {
      return <ShopperNavBar />;
    }
  } else {
    if (isLogged) {
      return <LoggedSellerNavBar />;
    } else {
      return <SellerNavBar />;
    }
  }
};

export default NavBar;
