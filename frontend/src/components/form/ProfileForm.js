import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const initialState = {
  shopName: "",
  shopDescription: "",
  email: "",
  profilePic: null,
  businessAddress: null,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProfileForm = () => {
  const profile = useSelector((state) => state.profile.profile);
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
      }
      setFormData(profileData);
      console.log("profile form");
    }
  }, [loading]);

  const {
    shopName,
    shopDescription,
    email,
    profilePic,
    businessAddress,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    dispatch(createProfile(formData, history, profile ? true : false));
  };

  return (
    <div className={classes.paper}>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Shop Name"
            name="shopName"
            value={shopName}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Shop Description"
            name="shopDescription"
            value={shopDescription}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default ProfileForm;
