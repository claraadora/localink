import React, { useState, useEffect } from "react";
import { MessageList } from "@livechat/ui-kit";
import { useSelector } from "react-redux";
import { LocalinkMessageListItem } from "./MessageListItem";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#000000",
  },
});
export const LocalinkMessageList = () => {
  const chat = useSelector((state) => state.chat);
  const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [chatList, setChatList] = useState(chat.chatList);
  const classes = useStyles();
  useEffect(() => {
    setChatList(chat.chatList);
    setActiveChat(chat.activeChat);
  }, [chat]);

  if (chatList.length === 0) {
    return null;
  } else {
    const msgList = chatList[activeChat].message_list;
    return (
      <Paper className={classes.paper}>
        <MessageList active>
          {msgList.map((msg, index) => {
            console.log(index);
            return <LocalinkMessageListItem data={msg} key={index} />;
          })}
        </MessageList>
      </Paper>
    );
  }
};
