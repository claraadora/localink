import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
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
import { useDispatch, useSelector } from "react-redux";
import { updateUserLocation } from "../../actions/shopper/searchActions";
import { yellow, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: green[300],
    "&:hover": {
      backgroundColor: green[400],
    },
    color: "white",
    justifyContent: "center",
  },
  text: {
    fontSize: "14px",
  },
}));

export const ManualLocationDialog = () => {
  const [open, setOpen] = React.useState(true);
  const [manualAdd, setManualAdd] = React.useState(false);
  const [manualLocation, setManualLocation] = React.useState(null);
  const [shopperId, setShopperId] = useState(null);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.user) setShopperId(auth.user._id);
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setManualAdd(false);
  };

  const handleManualAdd = () => {
    setManualAdd(true);
  };

  const handleSubmitAddManual = () => {
    setOpen(false);
    setManualAdd(false);
    dispatch(updateUserLocation(false, manualLocation, shopperId));
  };

  const handleTrack = () => {
    setOpen(false);
    dispatch(updateUserLocation(true, null, shopperId));
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
        <DialogTitle id="form-dialog-title">Add your location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding your current location allows us to help you find items near
            you
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your location"
            type="text"
            placeholder="Key in your location"
            onChange={(e) => setManualLocation(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <div>
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.text}
            >
              Use without starting position
            </Button>
            <Button className={classes.button} onClick={handleSubmitAddManual}>
              Submit Location
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
