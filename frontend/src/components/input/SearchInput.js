import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadSearch } from "../../actions/shopper/searchActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
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
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loadSearch(search, false));
  };

  const onChange = (e) => {
    setSearch(e.target.value);
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
