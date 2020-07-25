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
import { forgotPassword } from "../actions/shopper/authActions";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgetPasswordPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Continue
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
