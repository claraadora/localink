import React from "react";
import { useSelector } from "react-redux";
import { MessageGroup, Message, MessageText, Bubble } from "@livechat/ui-kit";

export const LocalinkMessageListItem = (props) => {
  const isShopper = useSelector((state) => state.page.isShopper);
  const id = useSelector((state) =>
    isShopper ? state.auth.user._id : state.profile.profile._id
  );
  //TODO CHANGE BACK TIME
  console.log(props);
  return (
    <MessageGroup onlyFirstWithMeta>
      <Message
        date={props.data.time.sameDay}
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
