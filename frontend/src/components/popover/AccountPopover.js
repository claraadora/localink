import React, { useState, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import { MenuItem, MenuList } from "@material-ui/core";

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

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

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
      <Typography
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        className={classes.button}
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverLeave}
      >
        Account
      </Typography>
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
          <MenuList>
            <MenuItem component={RouterLink} to="/business/account/profile">
              Store Profile
            </MenuItem>
            <MenuItem component={RouterLink} to="/business/account/settings">
              Account Settings
            </MenuItem>
          </MenuList>
        </Router>
      </Popover>
    </div>
  );
}
