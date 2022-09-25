import * as types from "../contains/modal";

export const showModal = (component) => {
  return {
    type: types.SHOW_MODAL,
    payload: {
      component,
    },
  };
};

export const hideModal = () => {
  return {
    type: types.HIDE_MODAL,
  };
};
