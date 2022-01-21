import * as types from "../contains/animaion";

export const showErrorMessage = (message) => {
  return {
    type: types.SHOW_ERROR_MESSAGE,
    payload: {
      message,
    },
  };
};

export const hideErrorMessage = () => {
  return {
    type: types.HIDE_ERROR_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};
