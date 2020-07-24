import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Avatar, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const ProductCard = (props) => {
  const product = props.product;
  console.log(product);
  const [name, description, image, price, stock, isService] = [
    product.name,
    product.description,
    product.image,
    product.price,
    product.stock,
    product.isService,
  ];
  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} image={image} />
      <CardContent>
        <Typography noWrap gutterBottom variant="body1" component="h2">
          {name}
        </Typography>
        <Typography
          noWrap
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          {`💲 Price: $ ${price}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`📈 Stock: ${stock === undefined ? "Not Available" : stock}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Itinerary</Button>
        <Button size="small">Ask Seller</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
