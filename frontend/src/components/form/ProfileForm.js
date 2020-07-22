import React, { useState, useEffect } from "react";
import {
  createProfile,
  getCurrentProfile,
} from "../../actions/seller/profileActions";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  TextField,
  Typography,
  InputLabel,
  Button,
  Grid,
  Avatar,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: "30%",
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
  const initialState = {
    shopName: "",
    description: "",
    avatar: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { shopName, description, avatar, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profileData) {
        profileData[key] = profile[key];
      }
      setFormData(profileData);
    }

    if (user) {
      setFormData({ ...profile, shopName: user.shopName });
    }
  }, [loading, dispatch, profile, user, avatar]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // eslint-disable-next-line no-restricted-globals
    dispatch(createProfile(formData, history, profile ? true : false));
  };

  const onUploadImage = (e) => {
    const errs = [];
    const file = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/gif"];

    // if (types.every((type) => file.type !== type)) {
    //   errs.push(`'${file.type} is not a supported format`);
    // }

    // if (file.size > 150000) {
    //   errs.push(`'${file.name}' is too large, please pick a smaller file`);
    // }

    // if (errs.length) {
    //   return errs.forEach((err) => this.toast(err, "custom", 2000, toastColor));
    // }
    let formData = new FormData();
    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", file);

    Axios.post("/business/profile/upload-avatar", formData, config).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response);
          setFormData({
            ...formData,
            [avatar]: response.data.url,
          });
          dispatch(getCurrentProfile());
        }
      }
    );
  };
  return (
    <div className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid container direction="column" justify="space-between" spacing={2}>
          <Grid item>
            <Grid container direction="row" alignItems="flex-end">
              <Grid item>
                <Avatar
                  alt="Localink"
                  src={avatar}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item>
                <label htmlFor="image">
                  <EditIcon fontSize="small" />
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onUploadImage}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <InputLabel>Shop Name</InputLabel>
            <TextField
              id="name"
              name="shopName"
              placeholder="Shop's name"
              fullWidth={true}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={shopName}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <InputLabel>Shop Description</InputLabel>
            <TextField
              id="description"
              name="description"
              placeholder="Shop's description"
              fullWidth={true}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={description}
              onChange={onChange}
              multiline
              rows={3}
              rowsMax={6}
            />
          </Grid>
          <Grid item>
            <InputLabel>Shop Address</InputLabel>
            <TextField
              id="address"
              name="address"
              placeholder="Business address"
              fullWidth={true}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={address}
              onChange={onChange}
              multiline
              rows={3}
              rowsMax={6}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contianed"
              color="primary"
              className={classes.submit}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

{
  /* <TextField
required
id="avatar"
name="avatar"
label={"Profile Picture"}
accept="image/png, image/jpeg"
type="file"
fullWidth
onChange={onChange}
value={avatar}
autoComplete="avatar"
helperText="Upload .jpeg or .png file"
margin={"normal"}
InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
/> */
}
export default ProfileForm;
