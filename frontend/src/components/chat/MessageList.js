import React, { useState, useEffect } from "react";
import { ChatList } from "@livechat/ui-kit";
import { useSelector } from "react-redux";
import {
  MessageList,
  MessageGroup,
  Message,
  MessageMedia,
} from "./ChatListItem";

export const LocalinkMessageList = () => {
  const chat = useSelector((state) => state.chat);
  // const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [activeChat, setActiveChat] = useState({
    id: 0,
    name: "Olivia",
    timestamp: "14:31",
    message: "Hello, I'm Olivia",
    messageList: [["aa", "aaaaa", "aaaaaaa"], []],
  });

  //   const [chatList, setChatList] = useState(chat.chatList);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    setChatList([
      {
        id: 0,
        name: "Olivia",
        timestamp: "14:31",
        message: "Hello, I'm Olivia",
      },
      {
        id: 1,
        name: "TA Olivia",
        timestamp: "14:32",
        message: "Hello, I'm TA Olivia",
      },
    ]);
  }, []);

  //   useEffect(() => {
  //     setActiveChat(chat.activeChat);
  //     setChatList(chat.chatList);
  //   }, [chat]);

  if (chatList === []) {
    return null;
  } else {
    return (
      <ChatList>
        {chatList &&
          chatList.map((chatItem) => (
            <LocalinkChatListItem
              isActive={activeChat.id === chatItem.id}
              name={chatItem.name}
              timestamp={chatItem.timestamp}
              message={chatItem.message}
            />
          ))}
      </ChatList>
    );
  }
};
