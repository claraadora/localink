import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
  },
}));

export const ChatPage = () => {
  const [chatMessage, setChatMessage] = useState("");

  const [socket, setSocket] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on("Output Chat Message", (messageFromBackEnd) => {
      console.log(messageFromBackEnd);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("Input Chat Message", {
      chatMessage,
      username,
    });
  };

  return (
    <div>
      <div>
        <Paper className={classes.root}>
          <Typography>Chat App</Typography>
        </Paper>
      </div>
      <div className={classes.flex} />
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          value={textMessage}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <button disabled={chatMessage.length === 0}>Send</button>
      </form>
    </div>
  );
};
