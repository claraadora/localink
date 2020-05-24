import React, { useState, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

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
    width: 199,
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
        <Router>
          <Button component={Link} to="/business/account/profile">
            Store Profile
          </Button>
          <br />
          <Button component={Link} to="/business/account/settings">
            Account Settings
          </Button>
        </Router>
      </Popover>
    </div>
  );
}
