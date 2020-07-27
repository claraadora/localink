import React from "react";
import { useSelector } from "react-redux";
import {
  MessageGroup,
  MessageMedia,
  Message,
  MessageText,
  Bubble,
} from "@livechat/ui-kit";
import { compareMoment } from "../../utils/chat";

export const LocalinkMessageListItem = (props) => {
  const isShopper = useSelector((state) => state.page.isShopper);
  const id = useSelector((state) =>
    isShopper ? state.auth.user._id : state.profile.profile._id
  );
  const type = props.data.type;
  console.log(type);
  //TODO CHANGE BACK TIME
  console.log(props);

  let content;

  switch (type) {
    case "text":
      content = <MessageText>{props.data.message}</MessageText>;
      break;
    case "image":
      content = (
        <MessageMedia>
          <img
            alt="media"
            src={props.data.message}
            style={{ maxWidth: "300px" }}
          />
        </MessageMedia>
      );
      break;
    default:
      content = <MessageText>Message type is not supported</MessageText>;
  }

  const time = props.data.time.unformatted;
  const timestampSelector = compareMoment(time);

  return (
    <MessageGroup onlyFirstWithMeta>
      <Message
        date={props.data.time[timestampSelector]}
        isOwn={props.data.userId === id}
        authorName={""}
      >
        <Bubble isOwn={props.data.userId === id}>{content}</Bubble>
      </Message>
    </MessageGroup>
  );
};
