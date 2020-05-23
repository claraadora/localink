import React, { useState, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
    padding: theme.spacing(1),
  },
  button: {
    backgroundColor: "white",
    variant: "contained",
    width: 180,
  },
}));

export default function AccountPopover() {
  const classes = useStyles();
  const popoverAnchor = useRef(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  const handlePopoverEnter = (event) => {
    setOpenedPopover(true);
  };

  const handlePopoverLeave = () => {
    setOpenedPopover(false);
  };

  return (
    <div>
      <Button
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        className={classes.button}
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverLeave}
      >
        <Typography>Account</Typography>
      </Button>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        disableRestoreFocus
        PaperProps={{
          onMouseEnter: handlePopoverEnter,
          onMouseLeave: handlePopoverLeave,
        }}
      >
        <Button href="/business/account/profile">Store Profile</Button>
        <br />
        <Button href="/business/account/settings">Account Settings</Button>
      </Popover>
    </div>
  );
}
