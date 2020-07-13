import profileConstants from "../constants/profileConstants";

const initialState = {
  profile: null,
  loading: true,
  error: {},
  isShopper: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case profileConstants.GET_PROFILE:
    case profileConstants.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case profileConstants.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        loading: false,
      };
    case profileConstants.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case profileConstants.UPDATE_IS_SHOPPER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
