import React from "react";
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
import { useDispatch } from "react-redux";
import { updateUserLocation } from "../../actions/shopper/searchActions";
import { yellow, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  startButton: {
    background: `linear-gradient(to bottom right, ${green[400]}, ${yellow[400]})`,
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
  text: {
    fontSize: "14px",
  },
}));

export const LocationDialog = () => {
  const [open, setOpen] = React.useState(true);
  const [manualAdd, setManualAdd] = React.useState(false);
  const [manualLocation, setManualLocation] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

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
    dispatch(updateUserLocation(false, manualLocation));
  };

  const handleTrack = () => {
    setOpen(false);
    dispatch(updateUserLocation(true, null));
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
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your location"
            type="text"
            placeholder="Key in your location"
            fullWidth
          /> */}
          {!manualAdd ? (
            <div>
              <Button
                onClick={handleManualAdd}
                color="primary"
                className={classes.startButton}
              >
                Manually key in your location
              </Button>
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
              <Button
                onClick={handleTrack}
                color="primary"
                className={classes.startButton}
              >
                Allow localink to track your location
              </Button>
            </div>
          ) : (
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
          )}
        </DialogContent>
        <DialogActions>
          {manualAdd ? (
            <div>
              <Button
                color="primary"
                className={classes.text}
                onClick={handleSubmitAddManual}
              >
                Submit Location
              </Button>
              <Button
                color="primary"
                className={classes.text}
                onClick={handleBack}
              >
                Back
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.text}
            >
              Use without starting position
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
