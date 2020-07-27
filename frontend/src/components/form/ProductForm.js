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
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/seller/profileActions";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import product from "../../utils/product.png";

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

export default function ProductForm() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
  });
  const { name, image, description, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    console.log(formData);
    dispatch(addProduct(formData));
  };

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    let form = new FormData();
    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };
    form.append("file", file);

    Axios.post("/business/product/upload-image", form, config).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response);
          setFormData({
            ...formData,
            image: response.data.url,
          });
          console.log(formData);
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
      <Typography variant="h5" gutterBottom align="center">
        Add Product
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
            <Grid item container direction="row" xs={12}>
              <Grid container direction="row" alignItems="flex-end" xs={12}>
                <Grid item>
                  <Avatar
                    alt={name !== "" ? name : "Localink"}
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
              <InputLabel>Product Name</InputLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Product name"
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
              <InputLabel>Product Description</InputLabel>
              <TextField
                id="description"
                name="description"
                placeholder="Description of Product"
                fullWidth={true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={description}
                onChange={onChange}
                multiline
                rows={5}
                rowsMax={6}
              />
            </Grid>
            <Grid item container xs={12}>
              <InputLabel>Product Price</InputLabel>
              <TextField
                id="price"
                name="price"
                placeholder="Product Price"
                fullWidth={true}
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={price}
                onChange={onChange}
                multiline
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
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
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
