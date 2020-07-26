import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
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
  const isShopper = useSelector((state) => state.page.isShopper);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading && !loading) {
      setIsLoading(false);
      setEmail("");
    }
  }, [loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(forgotPassword(email, isShopper));
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
          {isLoading && <CircularProgress />}
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
