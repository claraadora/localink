import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Divider,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setAlert } from "../actions/alertActions";
import { signup } from "../actions/seller/authActions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { resetPassword } from "../actions/seller/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgetPasswordPage(props) {
  const classes = useStyles();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const isShopper = useSelector((state) => state.page.isShopper);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      dispatch(setAlert("Passwords do not match."));
    } else {
      console.log(props.segment);
      dispatch(resetPassword(password1, props.segment));
    }
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100%", width: "100%" }}
      spacing={5}
    >
      <Grid item>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot your password?
          </Typography>
          <Typography component="h6">
            Please enter the email that you want to reset the password.
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password1"
              label="New Password"
              name="password1"
              onChange={(e) => setPassword1(e.target.value)}
              value={password1}
              autoFocus
              type="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              label="Confirm New Password"
              name="password2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              autoFocus
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
