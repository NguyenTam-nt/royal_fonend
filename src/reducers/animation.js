import * as types from "../contains/animaion";
const initialState = {
  isShowError: false,
  message: "",

  isLoading: false,
};

const animation = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        isShowError: true,
      };
    case types.HIDE_ERROR_MESSAGE:
      return {
        ...state,
        isShowError: false,
      };

    case types.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case types.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default animation;
