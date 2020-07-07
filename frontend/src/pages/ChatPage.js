import React, { useEffect } from "react";
import { ThemeProvider, defaultTheme } from "@livechat/ui-kit";
import { LocalinkChatList } from "../components/chat/ChatList";
import { LocalinkMessageList } from "../components/chat/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../actions/chatActions";
import { Grid } from "@material-ui/core";
import { themeChat } from "../themeChat";
export const ChatPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.chat.loading);
  useEffect(() => {
    dispatch(getChatList(user._id));
  }, [user, dispatch, loading]);
  return (
    <ThemeProvider theme={themeChat}>
      <Grid container direction="column">
        <Grid item md={12} container direction="row">
          <Grid item md={3}>
            <LocalinkChatList />
          </Grid>
          <Grid item md={9}>
            <LocalinkMessageList />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ChatPage;
