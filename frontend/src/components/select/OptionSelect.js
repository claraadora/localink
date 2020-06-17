import React, { useState } from "react";
import { deepPurple } from "@material-ui/core/colors";
import {
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  select: {
    width: 140,
    background: theme.palette.select.main,
    color: "black",
    fontWeight: 200,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 12,
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
    boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
    "&:focus": {
      borderRadius: 12,
      background: theme.palette.select.main,
      borderColor: deepPurple[100],
    },
  },
  icon: {
    color: deepPurple[300],
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
    zIndex: 1,
    position: "absolute",
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    zIndex: 1,
    "& li": {
      fontWeight: 200,
      paddingTop: 12,
      paddingBottom: 12,
    },
    "& li:hover": {
      background: theme.palette.additional.light,
    },
    "& li.Mui-selected": {
      color: "black",
      background: theme.palette.additional.main,
    },
    "& li.Mui-selected:hover": {
      background: theme.palette.additional.dark,
    },
  },
}));
export const OptionSelect = () => {
  const [val, setVal] = useState(1);
  const classes = useStyles();

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const iconComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  return (
    <FormControl>
      <Select
        disableUnderline
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={val}
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <Typography>Popularity</Typography>
        </MenuItem>
        <MenuItem value={1}>
          <Typography>Distance</Typography>
        </MenuItem>
        <MenuItem value={2}>
          <Typography>Price Low to High</Typography>
        </MenuItem>
        <MenuItem value={3}>
          <Typography>Price High to Low</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
