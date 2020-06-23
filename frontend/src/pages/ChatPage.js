import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, Typography, Paper } from "@material-ui/core";
import { ChatCard } from "../components/card/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getChat, afterPostMessage } from "../actions/chatActions";
import chat from "../reducers/chatReducers";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
  },
}));

const socket = io("http://localhost:5000");

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getChat());
    socket.on("Output Chat Message", (messageFromBackEnd) => {
      console.log(messageFromBackEnd);
      dispatch(afterPostMessage(messageFromBackEnd));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let username = user.name;
    let userId = user["_id"];
    let time = moment();
    let type = "text";
    let isShopper = true;
    let receiverId = "5ee10b4fd3dc884052fee116";

    console.log(time);

    socket.emit("Input Chat Message", {
      userId,
      username,
      message,
      time,
      type,
      receiverId,
      isShopper,
    });
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chats]);

  const renderChatCards = () => {
    chat &&
      chat.chatList.map((message) => (
        <ChatCard key={message._id} {...chat.chat} />
      ));
  };

  return (
    <div>
      <div>
        <Paper className={classes.root}>
          <Typography align="center">Chat App</Typography>
        </Paper>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          className="infinite-container"
          style={{ height: "500px", overflowY: "scroll" }}
        >
          {chats && renderChatCards()}
          <div ref={messagesEndRef} />
        </div>
        <div>
          <form id="chat-form" onSubmit={handleSubmit}>
            <input
              id="message"
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" disabled={message.length === 0}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
