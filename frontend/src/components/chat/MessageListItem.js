import React from "react";
import { useSelector } from "react-redux";
import { MessageGroup, Message, MessageText, Bubble } from "@livechat/ui-kit";

export const LocalinkMessageListItem = (props) => {
  const [messageText, time, userId] = [
    props.data.message,
    props.data.date,
    props.data.userId,
  ];
  const id = useSelector((state) => state.auth.user._id);
  return (
    <MessageGroup onlyFirstWithMeta>
      <Message date={time} isOwn={userId === id} authorName={""}>
        <Bubble isOwn={userId === id}>
          <MessageText>{messageText}</MessageText>
        </Bubble>
      </Message>
    </MessageGroup>
  );
};
