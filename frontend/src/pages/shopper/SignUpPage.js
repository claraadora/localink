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
import { setAlert } from "../../actions/alertActions";
import {
  signup,
  loginWithGoogle,
  loginWithFacebook,
} from "../../actions/shopper/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
    width: "50%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonFacebook: {
    width: "165px",
    height: "42px",
    borderRadius: "4px",
    background: "#3b5998",
    color: "white",
    border: "0px transparent",
    textAlign: "center",
    margin: "5px",
    display: "inline-block",
  },
  buttonGoogle: {
    width: "165px",
    height: "42px",
    borderRadius: "4px",
    background: "#db3236",
    color: "white",
    border: "0px transparent",
    textAlign: "center",
    margin: "5px",
    display: "inline-block",
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    dispatch(loginWithGoogle(response));
  };

  const responseFacebook = (response) => {
    dispatch(loginWithFacebook(response));
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(signup({ name, email, password }));
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/search" />;
  }

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
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              onChange={onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            <Grid item container="row" alignItems="center">
              <Grid item xs={5}>
                <Divider />
              </Grid>
              <Grid item xs={1} container="row" justify="center">
                <body>or</body>
              </Grid>
              <Grid item xs={6}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item>
                <GoogleLogin
                  clientId="56020081309-ndum5jd4ltace1utokr28brbrtjkjhb9.apps.googleusercontent.com"
                  buttonText="Sign up with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  className={classes.buttonGoogle}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
