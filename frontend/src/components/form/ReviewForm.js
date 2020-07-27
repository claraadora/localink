import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  makeStyles,
  Grid,
  Avatar,
  InputLabel,
  InputAdornment,
  Slider,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/seller/profileActions";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import product from "../../utils/product.png";
import { addReview } from "../../actions/shopper/catalogueActions";

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

export default function ReviewForm(props) {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(4);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addReview(description, image, rating, props.shopId));
  };

  const handleSlide = (event, newValue) => {
    setRating(newValue);
  };

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", file);

    Axios.post(`/review/upload-image/${props.shopId}`, formData, config).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          setImage(response.data.url);
        }
      }
    );
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
            <Grid item />
            <Grid item container direction="row" xs={12}>
              <Grid container direction="row" alignItems="flex-end" xs={12}>
                <Grid item>
                  <Avatar
                    alt={"Localink"}
                    src={image === "" ? product : image}
                    className={classes.avatar}
                    variant="square"
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
            <Grid item container xs={12}>
              <InputLabel>Description</InputLabel>
              <TextField
                id="description"
                name="description"
                placeholder="Description"
                fullWidth={true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={5}
                rowsMax={6}
              />
            </Grid>
            <Grid item container xs={12}>
              <InputLabel>Rating</InputLabel>
              <Slider
                value={rating}
                onChange={handleSlide}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
              />
            </Grid>
            <Grid item container xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Review
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
