import React, { useState, useEffect } from "react";
import {
  ChatListItem,
  Avatar,
  Column,
  Row,
  Subtitle,
  Title,
} from "@livechat/ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setCurrActive } from "../../actions/chatActions";

export const LocalinkChatListItem = (props) => {
  const dispatch = useDispatch();

  return (
    <ChatListItem
      active={props.isActive}
      // onClick={() => dispatch(setCurrActive(props.id))}
    >
      <Avatar letter={props.name[0]} />
      <Column fill>
        <Row justify>
          <Title ellipsis>{props.name}</Title>
          <Subtitle nowrap>{props.timestamp}</Subtitle>
        </Row>
        <Subtitle ellipsis>{props.message}</Subtitle>
      </Column>
    </ChatListItem>
  );
};
