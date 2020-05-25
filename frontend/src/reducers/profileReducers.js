import profileConstants from "../constants/profileConstants";

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case profileConstants.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case profileConstants.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case profileConstants.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
