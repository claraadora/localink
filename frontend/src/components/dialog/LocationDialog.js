import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyLocationIcon from "@material-ui/icons/MyLocation";

const useStyles = makeStyles((theme) => ({
  startButton: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(10, 107, 11, .3)",
    color: "white",
    height: 35,
    width: 403,
    padding: "0 30px",
    justifyContent: "center",
    fontSize: "14px",
  },
}));

export const LocationDialog = () => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MyLocationIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add your location.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding your current location allows us to help you find items near
            you.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your location"
            type="text"
            placeholder="Key in your location"
            fullWidth
          /> */}
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.startButton}
          >
            Manually key in your location.
          </Button>
          {/**START OF DIVIDER */}
          <Grid item container="row" alignItems="center">
            <Grid item xs={5}>
              <Divider />
            </Grid>
            <Grid item xs={1}>
              <body>or</body>
            </Grid>
            <Grid item xs={6}>
              <Divider />
            </Grid>
          </Grid>
          {/**END OF DIVIDER */}
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.startButton}
          >
            Allow localink to track your location.
          </Button>
          {/**START OF DIVIDER */}
          <Grid item container="row" alignItems="center">
            <Grid item xs={5}>
              <Divider />
            </Grid>
            <Grid item xs={1}>
              <body>or</body>
            </Grid>
            <Grid item xs={6}>
              <Divider />
            </Grid>
          </Grid>
          {/**END OF DIVIDER */}
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.startButton}
          >
            Use localink without starting position.
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Allow
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
