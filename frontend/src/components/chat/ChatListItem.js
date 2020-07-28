import React from "react";
import { ChatListItem, Column, Row, Subtitle, Title } from "@livechat/ui-kit";
import { useDispatch } from "react-redux";
import { setCurrActive } from "../../actions/chatActions";
import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const LocalinkChatListItem = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(props);
  return (
    <ChatListItem
      active={props.isActive}
      onClick={() => dispatch(setCurrActive(props._id))}
    >
      <Grid container direction="row" style={{ height: "100%" }}>
        <Grid item md={2}>
          <Avatar
            alt={props.name}
            src={props.avatar}
            className={classes.avatar}
          />
        </Grid>
        <Grid item container direction="column" md={10} justify="space-evenly">
          <Grid item container direction="row" justify="space-between">
            <Grid item md={8}>
              <Typography variant="bodyChat" noWrap>
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{props.timestamp}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" noWrap>
              {props.message && props.message.includes("data:image/")
                ? "Photo"
                : props.message}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ChatListItem>
  );
};
