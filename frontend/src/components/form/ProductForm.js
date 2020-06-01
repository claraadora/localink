import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/seller/profileActions";

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
    width: "70%", // Fix IE 11 issue.
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
    dispatch(addProduct(formData, history));
  };

  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Add Product
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          required
          id="name"
          name="name"
          label="Name of product"
          fullWidth
          onChange={onChange}
          autoComplete="name"
          variant="outlined"
          margin="normal"
          required
          autoFocus
          value={name}
        />
        <TextField
          required
          id="image"
          name="image"
          label="Image"
          fullWidth
          onChange={onChange}
          autoComplete="image"
          variant="outlined"
          margin="normal"
          value={image}
          required
          fullWidth
          autoFocus
        />

        <TextField
          required
          id="description"
          name="description"
          label="Product Description"
          fullWidth
          onChange={onChange}
          autoComplete="description"
          variant="outlined"
          margin="normal"
          value={description}
          required
          multiline
          rows={3}
          maxRows={5}
          fullWidth
          autoFocus
        />

        <TextField
          id="price"
          name="price"
          label="Price"
          fullWidth
          onChange={onChange}
          autoComplete="price"
          variant="outlined"
          margin="normal"
          value={price}
          required
          fullWidth
          autoFocus
        />
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
      </form>
    </div>
  );
}
