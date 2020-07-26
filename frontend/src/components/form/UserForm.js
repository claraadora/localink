import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  makeStyles,
  Grid,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addUser } from "../../actions/seller/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const roles = [
  {
    value: "staff",
    label: "staff",
  },
  {
    value: "owner",
    label: "owner",
  },
];

export default function ProductForm() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });
  const { name, email, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
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
      <Typography variant="h5" gutterBottom align="center">
        Add User
      </Typography>
      <Grid item container xs={4}>
        <form onSubmit={onSubmit} className={classes.form}>
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item container xs={12}>
              <InputLabel>Name</InputLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Name"
                fullWidth={true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={name}
                onChange={onChange}
              />
            </Grid>
            <Grid item container xs={12}>
              <InputLabel>Email</InputLabel>
              <TextField
                id="email"
                name="email"
                placeholder="New user's email"
                fullWidth={true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item container xs={12}>
              <InputLabel>Role</InputLabel>
              <TextField
                id="role"
                name="role"
                select
                value={role}
                onChange={onChange}
                variant="outlined"
                fullWidth={true}
                margin="dense"
                placeholder="New user's role"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item container xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={onSubmit}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
