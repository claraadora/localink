import React, { useState, useEffect } from "react";
import { ChatList } from "@livechat/ui-kit";
import { useSelector } from "react-redux";
import { LocalinkChatListItem } from "./ChatListItem";
import { compareMoment } from "../../utils/chat";

export const LocalinkChatList = (props) => {
  const chat = useSelector((state) => state.chat);
  const isShopper = useSelector((state) => state.page.isShopper);
  const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [chatList, setChatList] = useState(chat.chatList);

  useEffect(() => {
    setChatList(chat.chatList);
    setActiveChat(chat.activeChat);
  }, [chat]);

  if (chat && chat.chatList.length === 0) {
    return null;
  } else {
    return (
      <ChatList>
        {chatList.length > 0 &&
          chatList.map((chatItem) => {
            const [_id, name, message_list] = [
              isShopper ? chatItem.shop : chatItem.shopper,
              isShopper ? chatItem.shopName : chatItem.shopperName,
              chatItem.message_list,
            ];
            const avatar = isShopper ? chatItem.shopAvatar : null;
            const len = message_list.length;
            const timestampSelector =
              len > 0
                ? compareMoment(message_list[len - 1].time.unformatted)
                : null;

            return (
              <LocalinkChatListItem
                isActive={activeChat === _id}
                _id={_id}
                key={_id}
                name={name}
                timestamp={
                  len > 0 ? message_list[len - 1].time[timestampSelector] : null
                }
                message={len > 0 ? message_list[len - 1].message : null}
                avatar={avatar}
              />
            );
          })}
      </ChatList>
    );
  }
};
