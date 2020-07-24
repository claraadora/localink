import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setTravelMode } from "../../actions/shopper/searchActions";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const TravelSelect = () => {
  const classes = useStyles();
  const [travelMode, updateTravelMode] = useState("DRIVING");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const mode = event.target.value;
    updateTravelMode(mode);
  };

  useEffect(() => {
    dispatch(setTravelMode(travelMode));
  }, [travelMode]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Travel Mode</InputLabel>
      <Select value={travelMode} onChange={handleChange}>
        <MenuItem value="DRIVING">Driving</MenuItem>
        <MenuItem value="BICYCLING">Bicycling</MenuItem>
        <MenuItem value="TRANSIT">Transit</MenuItem>
        <MenuItem value="WALKING">Walking</MenuItem>
      </Select>
    </FormControl>
  );
};
