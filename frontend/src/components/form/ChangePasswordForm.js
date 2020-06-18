import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { changePassword } from "../../actions/seller/authActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangePasswordForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const { oldPassword, newPassword, newPassword2 } = formData;
  const dispatch = useDispatch();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword }));
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Old password"
          name="oldPassword"
          onChange={onChange}
          autoComplete="email"
          autoFocus
          value={oldPassword}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="New password"
          name="newPassword"
          onChange={onChange}
          autoComplete="newPassword"
          value={newPassword}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Confirm new password"
          name="newPassword2"
          onChange={onChange}
          autoComplete="newPassword2"
          value={newPassword2}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
