import React from "react";
import { makeStyles, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  rounded: {
    color: "#fff",
  },
  container: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  uploader: {
    visibility: "hidden",
    display: "none",
  },
}));

export const ShopAvatar = (src, name) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        variant="rounded"
        className={classes.rounded}
        src={src}
        alt={name}
      />
    </div>
  );
};
