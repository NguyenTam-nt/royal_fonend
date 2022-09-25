import * as types from "../contains/modal";

const initialState = {
  isModal: false,
  component: null,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        isModal: true,
        component: action.payload.component,
      };

    case types.HIDE_MODAL:
      return {
        ...state,
        isModal: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modal;
