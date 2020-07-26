import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { useDispatch, useSelector } from "react-redux";
import { updateUserLocation } from "../../actions/shopper/searchActions";
import { yellow, green } from "@material-ui/core/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  createNavLink,
  sendNavLink,
} from "../../actions/shopper/searchActions";
import { setAlert } from "../../actions/alertActions";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[300],
    },
    border: 0,
    borderRadius: 3,
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

export const NavLinkDialog = () => {
  const [open, setOpen] = React.useState(false);
  const navLink = useSelector((state) => state.search.navLink);
  const [copied, setCopied] = useState(false);
  const auth = useSelector((state) => state.auth);
  const sentLink = useSelector((state) => state.search.sentLink);
  const stops = useSelector((state) => state.search.stops);
  const travelMode = useSelector((state) => state.search.travelMode);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading && sentLink) {
      setIsLoading(false);
    }
  }, [sentLink]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          handleClickOpen();
          dispatch(createNavLink(stops, travelMode));
        }}
      >
        <PhoneAndroidIcon fontSize="medium" className={classes.phoneButton} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Get Google Map Navigation Link
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            View the routes on your mobile phone!
          </DialogContentText>
          <Grid container direction="column">
            {isLoading && (
              <>
                <Grid item md={1} />
                <Grid item container justify="center" alignItems="center">
                  <CircularProgress />
                </Grid>
                <Grid item md={1} />
              </>
            )}
            <Grid item container justify="center" alignItems="center">
              <CopyToClipboard
                text={navLink}
                onCopy={() => {
                  dispatch(setAlert("Link copied", "success"));
                }}
              >
                <Button className={classes.button}>
                  <Typography align="center" variant="body2">
                    Copy Link to Clipboard 📋
                  </Typography>
                </Button>
              </CopyToClipboard>
            </Grid>
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
            <Grid item container justify="center" alignItems="center">
              <Button
                onClick={() => {
                  setIsLoading(true);
                  dispatch(sendNavLink(navLink));
                }}
                className={classes.button}
              >
                <Typography align="center" variant="body2">
                  Send Link to Email 💌
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </div>
  );
};
