import React from "react";
import {
  ChatListItem,
  Avatar,
  Column,
  Row,
  Subtitle,
  Title,
} from "@livechat/ui-kit";
import { useDispatch } from "react-redux";
import { setCurrActive } from "../../actions/chatActions";
import { Grid } from "@material-ui/core";

function trimString(word, maxLength) {
  return word <= maxLength ? word : word.substring(0, maxLength - 3) + "...";
}

export const LocalinkChatListItem = (props) => {
  const dispatch = useDispatch();

  return (
    <ChatListItem
      active={props.isActive}
      onClick={() => dispatch(setCurrActive(props._id))}
    >
      <Avatar letter={props.name[0]} />
      <Column fill>
        <Row>
          <Grid container direction="row">
            <Grid item md={9}>
              <Title ellipsis>{props.name}</Title>
            </Grid>
            <Grid item md={1} />
            <Grid item md={2}>
              <Subtitle nowrap>{"12:45 PM"}</Subtitle>
            </Grid>
          </Grid>
        </Row>

        <Subtitle ellipsis>{props.message}</Subtitle>
      </Column>
    </ChatListItem>
  );
};
