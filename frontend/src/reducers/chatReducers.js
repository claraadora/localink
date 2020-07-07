import chatConstants from "../constants/chatConstants";

const initialState = {
  chatList: [],
  activeChat: 0,
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
    default:
      return state;
  }
};

export default chat;

// case chatConstants.AFTER_POST_MESSAGE:
//   return {
//     ...state,
//     chatList: state.conversations.concat(payload),
//   };
