import React, { useState, useEffect } from "react";
import {
  Row,
  MessageList,
  TextInput,
  SendButton,
  TextComposer,
  FixedWrapper,
  IconButton,
} from "@livechat/ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { LocalinkMessageListItem } from "./MessageListItem";
import { Paper, Grid, makeStyles, Typography, iCon } from "@material-ui/core";
import moment from "moment";
import { getChatById } from "../../utils/chat";
import { afterPostMessage } from "../../actions/chatActions";
import Dropzone from "react-dropzone";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Axios from "axios";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#000000",
    padding: "1.5em",
    flex: "100%",
  },
});

export const LocalinkMessageList = (props) => {
  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const isShopperState = useSelector((state) => state.page.isShopper);
  const [activeChat, setActiveChat] = useState(chat.activeChat);
  const [chatList, setChatList] = useState(chat.chatList);
  const [msgList, setMsgList] = useState(null);
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chat.loading);
  const [messagesEnd, setMessagesEnd] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (messagesEnd !== null) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesEnd]);
  useEffect(() => {
    setChatList(chat.chatList);
    setActiveChat(chat.activeChat);
    if (chat.chatList.length > 0) {
      const currChat = getChatById(
        chat.activeChat,
        isShopperState,
        chat.chatList
      );
      const currMsgList = currChat.message_list;
      setMsgList(currMsgList);
    }
  }, [chat, dispatch, isShopperState]);

  const handleSubmit = (e) => {
    let momentObj = moment();
    let username = isShopperState ? user.name : user.shopName;
    let userId = isShopperState ? user._id : profile._id;
    let time = {
      sameDay: momentObj.format("h:mm a"),
      sameElse: momentObj.format("Do MMMM YYYY h:mm a"),
      unformatted: momentObj,
    };
    let type = "text";
    let receiverId = activeChat;
    let isShopper = isShopperState ? "true" : "false";
    let message = textInput;

    const obj = {
      userId: userId,
      username: username,
      message: message,
      time: time,
      type: type,
    };

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
    dispatch(
      afterPostMessage({ messageFromBackEnd: obj, isShopper: isShopperState })
    );
  };

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", file);

    Axios.post(
      isShopperState
        ? "/chat/upload-attachment"
        : "/business/chat/upload-attachment",
      formData,
      config
    ).then((response) => {
      if (response.data.success) {
        let momentObj = moment();

        let userId = isShopperState ? user._id : profile._id;
        let username = isShopperState ? user.name : user.shopName;
        let message = response.data.url;
        let time = {
          sameDay: momentObj.format("h:mm a"),
          sameElse: momentObj.format("Do MMMM YYYY h:mm a"),
          unformatted: momentObj,
        };
        let type = "image";
        let receiverId = activeChat;
        let isShopper = isShopperState ? "true" : "false";

        console.log(message);
        props.socket.emit("Input Chat Message", {
          userId,
          username,
          message,
          time,
          type,
          receiverId,
          isShopper,
        });

        const obj = {
          userId: userId,
          username: username,
          message: message,
          time: time,
          type: type,
        };
        dispatch(
          afterPostMessage({
            messageFromBackEnd: obj,
            isShopper: isShopperState,
          })
        );
      }
    });
  };

  if (!loading && (chatList.length === 0 || msgList === null)) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
        spacing={5}
      >
        <Grid item>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            No messages
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        item
        container
        direction="column"
        style={{ height: "100%", width: "100%" }}
      >
        <Grid item md={10} style={{ overflow: "hidden", width: "75vw" }}>
          <MessageList
            active
            style={{
              flex: "100%",
              width: "100%",
            }}
          >
            {msgList.map((msg, index) => {
              return (
                <Grid item>
                  <LocalinkMessageListItem data={msg} key={index} />
                </Grid>
              );
            })}
            {
              <div
                ref={(el) => {
                  setMessagesEnd(el);
                }}
                style={{ float: "left", clear: "both" }}
              />
            }
          </MessageList>
        </Grid>
        <Grid item>
          <TextComposer
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onSend={handleSubmit}
          >
            <Row align="center">
              <div>
                <label for="image">
                  <AttachFileIcon />
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onUploadImage}
                />
              </div>
              <TextInput fill />
              <SendButton fit />
            </Row>
          </TextComposer>
        </Grid>
      </Grid>
    );
    // <div>
    //   <Grid item md={10} style={{ overflow: "hidden", width: "100%" }}>
    //     <MessageList active>
    //       {msgList.map((msg, index) => {
    //         return <LocalinkMessageListItem data={msg} key={index} />;
    //       })}
    //     </MessageList>
    //   </Grid>
    //   <Grid item md={2}>
    //     <TextComposer
    //       value={textInput}
    //       onChange={(e) => setTextInput(e.target.value)}
    //       onSend={handleSubmit}
    //     >
    //       <Row align="center">
    //         <TextInput fill />
    //         <SendButton fit />
    //       </Row>
    //     </TextComposer>
    //   </Grid>
    // </div>
    // );
  }
};
