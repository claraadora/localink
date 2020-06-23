import React from "react";
import moment from "moment";
import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export const ChatCard = (props) => {
  const classes = useStyles();
  console.log(props.name);
  return (
    <div style={{ width: "100%" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.image} />
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.message}
              </Typography>
              {moment().fromNow()}
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
};

export default ChatCard;
