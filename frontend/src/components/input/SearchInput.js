import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loadSearch } from "../../actions/shopper/searchActions";
import { Redirect, useLocation } from "react-router-dom";

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
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`searching for ${search}`);
    dispatch(loadSearch(search, false));
    console.log(location.pathname);
    return <Redirect to="/search/" />;
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

export default withRouter(SearchInput);
