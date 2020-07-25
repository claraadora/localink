import React, { useEffect } from "react";
import { ThemeProvider } from "@livechat/ui-kit";
import { LocalinkChatList } from "../components/chat/ChatList";
import { LocalinkMessageList } from "../components/chat/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { themeChat } from "../themeChat";
import io from "socket.io-client";
import { getChatList, afterPostMessage } from "../actions/chatActions";
import profileConstants from "../constants/profileConstants";

const socket = io("https://pristine-big-bend-88828.herokuapp.com");

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
  },
  chatList: {
    flex: "30%",
    display: "flex",
    minHeight: "100px",
    flexDirection: "column",
    overflow: "hidden",
    borderRight: "solid 1px #f6f6f6",
  },
  messageList: {
    flex: "70%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#fff",
  },
});

export const ChatPage = (props) => {
  const dispatch = useDispatch();
  const isShopper = useSelector((state) => state.page.isShopper);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.chat.loading);
  const chat = useSelector((state) => state.chat);
  const classes = useStyles();
  useEffect(() => {
    socket.on("Output Chat Message", (messageFromBackEnd) => {
      if (messageFromBackEnd.userId !== (isShopper ? user._id : profile._id)) {
        console.log("listening");
        dispatch(afterPostMessage({ messageFromBackEnd, isShopper }));
      }
    });
    return () => socket.disconnect();
  }, [dispatch, isShopper, user._id, profile]);

  useEffect(() => {
    dispatch(getChatList(isShopper ? user._id : profile._id, isShopper));
  }, [user, profile, loading, dispatch, isShopper]);

  return (
    <ThemeProvider theme={themeChat}>
      <Grid container direction="row" style={{ height: "92vh" }}>
        <Grid item md={3}>
          <LocalinkChatList isShopper={isShopper} />
        </Grid>
        <Grid
          item
          container
          md={9}
          style={{ height: "92vh" }}
          direction="column"
        >
          <LocalinkMessageList socket={socket} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChatPage;
