import React, { useEffect } from "react";
import { ThemeProvider } from "@livechat/ui-kit";
import { LocalinkChatList } from "../components/chat/ChatList";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../actions/chatActions";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getChatList(user._id), []);
  });
  return (
    <ThemeProvider>
      <LocalinkChatList />
    </ThemeProvider>
  );
};

export default ChatPage;
