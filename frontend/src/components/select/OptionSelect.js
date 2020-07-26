import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { reorderSearch } from "../../actions/shopper/searchActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export const OptionSelect = () => {
  const [sortBy, setSortBy] = useState("priceAsc");
  const productArray = useSelector((state) => state.search.productArray);
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  //Calculate Distance
  const search = useSelector((state) => state.search);
  const [userLocation, setUserlocation] = useState(search.userLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    setUserlocation(search.userLocation);
  }, [search]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSort = (sortBy, order) => {
    return dispatch(reorderSearch(sortBy, order, productArray, auth.user._id));
  };

  return (
    <FormControl classes={classes.formControl}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortBy} onChange={handleChange}>
        <MenuItem
          value="ratingsAsc"
          onClick={() => handleSort("ratings", "ascending")}
        >
          Ratings
        </MenuItem>
        {userLocation !== null ? (
          <MenuItem
            value="distanceAsc"
            onClick={() => handleSort("distance", "ascending")}
          >
            Distance
          </MenuItem>
        ) : null}
        <MenuItem
          value="priceAsc"
          onClick={() => handleSort("price", "ascending")}
        >
          Price Low to High
        </MenuItem>
        <MenuItem
          value="priceDesc"
          onClick={() => handleSort("price", "descending")}
        >
          Price High to Low
        </MenuItem>
      </Select>
    </FormControl>
  );
};
