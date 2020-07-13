import React from "react";
import { useSelector } from "react-redux";
import { MessageGroup, Message, MessageText, Bubble } from "@livechat/ui-kit";

export const LocalinkMessageListItem = (props) => {
  const id = useSelector((state) => state.auth.user._id);
  return (
    <MessageGroup onlyFirstWithMeta>
      <Message
        date={props.data.date}
        isOwn={props.data.userId === id}
        authorName={""}
      >
        <Bubble isOwn={props.data.userId === id}>
          <MessageText>{props.data.message}</MessageText>
        </Bubble>
      </Message>
    </MessageGroup>
  );
};
