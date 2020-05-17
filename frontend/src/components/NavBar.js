import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

const NavBar = () => {
  const styles = useStyles();
  return (
    <AppBar position="fixed">
      <Typography className={styles.typographyStyles}>localink</Typography>
      <AccountCircle />
    </AppBar>
  );
};

export default NavBar;
