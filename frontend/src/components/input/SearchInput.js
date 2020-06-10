import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loadSearch } from "../../actions/shopper/searchActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.4),
    },
  },
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 1,
    fontSize: 15,
  },
}));

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`searching for ${searchQuery}`);
    dispatch(loadSearch(searchQuery));
  };

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Paper
      elevation={0}
      component="form"
      className={classes.root}
      onSubmit={onSubmit}
    >
      <InputBase
        placeholder="Search at localink..."
        className={classes.input}
        inputProps={{ "aria-label": "search" }}
        onChange={onChange}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
