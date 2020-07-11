import React, { useState, useEffect } from "react";
import {
  Row,
  MessageList,
  TextInput,
  SendButton,
  TextComposer,
} from "@livechat/ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { LocalinkMessageListItem } from "./MessageListItem";
import { Paper, makeStyles } from "@material-ui/core";
import moment from "moment";
import { getChatById } from "../../utils/chat";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#000000",
  },
});

export const LocalinkMessageList = (props) => {
  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);
  const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [chatList, setChatList] = useState(chat.chatList);
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();

  const classes = useStyles();
  useEffect(() => {
    setChatList(chat.chatList);
    setActiveChat(chat.activeChat);
  }, [chat]);

  const handleSubmit = (e) => {
    let username = user.name;
    let userId = user._id;
    let time = moment();
    let type = "text";
    let receiverId = activeChat;
    let isShopper = props.isShopper;
    let message = textInput;

    props.socket.emit("Input Chat Message", {
      userId,
      username,
      message,
      time,
      type,
      receiverId,
      isShopper,
    });
    setTextInput("");
    console.log("submitted");
  };

  if (chatList.length === 0) {
    return null;
  } else {
    const msgList =
      activeChat === null
        ? chatList[0].message_list
        : getChatById(props.activeChat, props.isShopper, chatList).message_list;
    return (
      <Paper className={classes.paper}>
        <MessageList active>
          {msgList.map((msg, index) => {
            return <LocalinkMessageListItem data={msg} key={index} />;
          })}
        </MessageList>
        <TextComposer
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onSend={handleSubmit}
        >
          <Row align="center">
            <TextInput fill />
            <SendButton fit />
          </Row>
        </TextComposer>
      </Paper>
    );
  }
};
