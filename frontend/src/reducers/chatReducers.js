import chatConstants from "../constants/chatConstants";

const initialState = {
  chats: [],
  error: {},
};

export const chat = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case chatConstants.GET_CHATS:
      return { ...state, chats: action.payload };
    case chatConstants.AFTER_POST_MESSAGE:
      return {
        ...state,
        chats: state.chats.concat(payload),
      };
    case chatConstants.CHAT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default chat;
