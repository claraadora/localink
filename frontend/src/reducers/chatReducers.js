import chatConstants from "../constants/chatConstants";

const initialState = {
  conversations: [],
  error: {},
};

export const chat = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case chatConstants.GET_CHATS:
      return { ...state, conversations: action.payload };
    case chatConstants.AFTER_POST_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.concat(payload),
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
