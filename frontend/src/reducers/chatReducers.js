import chatConstants from "../constants/chatConstants";

const initialState = {
  chatList: [],
  activeChat: null,
  loading: true,
  error: {},
};

export const chat = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case chatConstants.GET_CHAT:
      return { ...state, chatList: payload, loading: false };
    case chatConstants.CHAT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case chatConstants.AFTER_POST_MESSAGE:
      return {
        ...state,
        chatList: state.chatList.map((chatItem) => {
          console.log("before payload" + payload.isShopper);
          console.log(payload);
          console.log(state.activeChat);
          console.log(chatItem[payload.isShopper ? "shop" : "shopper"]);
          const select = payload.isShopper ? "shop" : "shopper";
          console.log(select);
          if (chatItem[select] === state.activeChat) {
            console.log("payload");
            console.log(payload);
            chatItem.message_list.push(payload.messageFromBackEnd);
          }
          return chatItem;
        }),
      };
    case chatConstants.SET_CURR_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: payload,
      };
    case chatConstants.ADD_CHAT_ITEM:
      return { state };
    default:
      return state;
  }
};

export default chat;
