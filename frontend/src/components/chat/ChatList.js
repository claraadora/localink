import React, { useState, useEffect } from "react";
import { ChatList } from "@livechat/ui-kit";
import { useSelector } from "react-redux";
import { LocalinkChatListItem } from "./ChatListItem";
import { makeStyles } from "@material-ui/styles";

export const LocalinkChatList = () => {
  const chat = useSelector((state) => state.chat);
  const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [chatList, setChatList] = useState(chat.chatList);

  useEffect(() => {
    setChatList(chat.chatList);
    setActiveChat(chat.activeChat);
  }, [chat]);

  if (chatList.length === 0) {
    return null;
  } else {
    return (
      <ChatList>
        {chatList.length > 0 &&
          chatList.map((chatItem, index) => {
            const [_id, shopName, message_list] = [
              chatItem._id,
              chatItem.shopName,
              chatItem.message_list,
            ];
            const len = message_list.length;
            return (
              <LocalinkChatListItem
                isActive={activeChat === index}
                name={shopName}
                timestamp={len > 0 ? message_list[len - 1].date : null}
                message={len > 0 ? message_list[len - 1].message : null}
              />
            );
          })}
      </ChatList>
    );
  }
};
