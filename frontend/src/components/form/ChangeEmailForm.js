import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/Grid";
import Grid from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { changeEmail } from "../../actions/seller/authActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangeEmailForm() {
  const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  useEffect(() => {
    if (isLoading && !loading) {
      setIsLoading(false);
      setFormData({ email: "" });
    }
  }, [loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(changeEmail({ email }));
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      style={{ height: "100%" }}
      spacing={5}
    >
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={onChange}
            autoComplete="email"
            autoFocus
            value={email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Email
          </Button>
        </form>
      </div>
    </Grid>
  );
}
