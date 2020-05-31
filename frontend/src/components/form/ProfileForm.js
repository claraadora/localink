import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const initialState = {
  shopName: "",
  description: "",
  avatar: "",
  address: "",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProfileForm = () => {
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
        console.log("profile dataaaaa " + profileData);
      }
      profileData[shopName] = user.shopName;
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { shopName, description, avatar, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // eslint-disable-next-line no-restricted-globals
    dispatch(createProfile(formData, history, profile ? true : false));
  };

  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          required
          id="shopName"
          name="shopName"
          label="Shop Name"
          value={shopName}
          fullWidth
          onChange={onChange}
          autoComplete="shopName"
          variant="outlined"
          margin="normal"
          required
          autoFocus
        />
        <TextField
          required
          id="description"
          name="description"
          label="Shop Description"
          fullWidth
          onChange={onChange}
          value={description}
          autoComplete="description"
          variant="outlined"
          margin="normal"
          multiline
          rows={3}
          rowsMax={6}
          required
          autoFocus
        />
        <TextField
          required
          id="avatar"
          name="avatar"
          label="Profile Picture"
          fullWidth
          onChange={onChange}
          value={avatar}
          autoComplete="avatar"
          variant="outlined"
          margin="normal"
          required
          autoFocus
        />
        <TextField
          required
          id="address"
          name="address"
          label="Business Address"
          fullWidth
          onChange={onChange}
          value={address}
          autoComplete="address"
          variant="outlined"
          margin="normal"
          required
          autoFocus
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
