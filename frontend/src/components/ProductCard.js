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
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const ProductCard = (props) => {
  const {
    shopName,
    shopAvatar,
    productImage,
    productDescription,
    productPrice,
    productRating,
    shopDistance,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader avatar={<Avatar src={shopAvatar} />} title={shopName} />
      <CardMedia className={classes.media} image={productImage} />
      <CardContent>
        <Typography variant="body2" component="p">
          {productDescription}
        </Typography>
        <Typography variant="body2" component="p">
          {productPrice}
        </Typography>
        <Typography variant="body2" component="p">
          {productRating}
        </Typography>
        <Typography variant="body2" component="p">
          {shopDistance}
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
