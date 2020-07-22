import React, { useEffect } from "react";
import { ThemeProvider } from "@livechat/ui-kit";
import { LocalinkChatList } from "../components/chat/ChatList";
import { LocalinkMessageList } from "../components/chat/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { themeChat } from "../themeChat";
import io from "socket.io-client";
import { getChatList, afterPostMessage } from "../actions/chatActions";
import profileConstants from "../constants/profileConstants";

const socket = io("http://localhost:5000");

export const ChatPage = (props) => {
  const dispatch = useDispatch();
  const isShopper = useSelector((state) => state.page.isShopper);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.chat.loading);
  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    socket.on("Output Chat Message", (messageFromBackEnd) => {
      if (messageFromBackEnd.userId !== user._id) {
        dispatch(afterPostMessage({ messageFromBackEnd, isShopper }));
      }
    });
    return () => socket.disconnect();
  }, [dispatch, isShopper, user._id]);

  useEffect(() => {
    dispatch(getChatList(isShopper ? user._id : profile._id, isShopper));
  }, [user, loading, dispatch, isShopper]);

  return (
    <ThemeProvider theme={themeChat}>
      <Grid container direction="column">
        <Grid item md={12} container direction="row">
          <Grid item md={3}>
            <LocalinkChatList isShopper={isShopper} />
          </Grid>
          <Grid item md={9}>
            <LocalinkMessageList socket={socket} />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChatPage;
