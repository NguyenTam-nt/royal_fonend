import * as types from "../contains/user";

export const signUp = (data) => {
  return {
    type: types.SIGN_UP,
    payload: {
      data,
    },
  };
};

export const signUpSuccess = () => {
  return {
    type: types.SIGN_UP_SUCCESS,
  };
};

export const signUpFail = (error) => {
  return {
    type: types.SIGN_UP_Fail,
    payload: {
      error,
    },
  };
};

export const signUpEmail = (email) => {
  return {
    type: types.SIGN_UP_EMAIL,
    payload: {
      email,
    },
  };
};

export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER,
    payload: {
      data,
    },
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginUserFail = () => {
  return {
    type: types.LOGIN_USER_FAIL,
  };
};

export const refreshToken = (type) => {
  return {
    type: types.REFRESHTOKEN,
    payload: {
      type,
    },
  };
};

export const refreshTokenSuccess = (token) => {
  return {
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const refreshTokenFail = () => {
  return {
    type: types.REFRESH_TOKEN_FAIL,
  };
};

export const getUserNoFriend = (id) => {
  return {
    type: types.GET_USER_NOFRIEND,
    payload: {
      id,
    },
  };
};

export const getUserFriend = (data) => {
  return {
    type: types.GET_USER_FRIEND,
    payload: {
      data,
    },
  };
};

export const getUserLinkSelect = (data) => {
  return {
    type: types.GET_USER_FRIEND_LINK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getUserFriendSuccess = (users) => {
  return {
    type: types.GET_USER_FRIEND_SUCCESS,
    payload: {
      users,
    },
  };
};

export const getUserFriendFail = () => {
  return {
    type: types.GET_USER_FRIEND_SUCCESS,
  };
};

export const searchUser = (keyword) => {
  return {
    type: types.SEARCH_USER,
    payload: {
      keyword,
    },
  };
};

export const searchUserSuccess = (listUser) => {
  return {
    type: types.SEARCH_USER_SUCCESS,
    payload: {
      listUser,
    },
  };
};

export const clearUserSearch = () => {
  return {
    type: types.CLEAR_USER_SEARCH,
  };
};

export const userOnline = (data) => {
  return {
    type: types.USER_ONLINE,
    payload: {
      data,
    },
  };
};

export const userOffline = (id) => {
  return {
    type: types.USER_OFFLINE,
    payload: {
      id,
    },
  };
};

export const getUserFriendDetail = (iduser) => {
  return {
    type: types.GET_FRIEND_DETAIL,
    payload: {
      iduser,
    },
  };
};

export const getUserFriendDetailSuccess = (listUser) => {
  return {
    type: types.GET_FRIEND_DETAIL_SUCCESS,
    payload: {
      listUser,
    },
  };
};

export const unFriendUser = (id) => {
  return {
    type: types.UN_FRIEND,
    payload: {
      id,
    },
  };
};

export const unFriendUserSuccess = (id) => {
  return {
    type: types.UN_FRIEND_SUCCESS,
    payload: {
      id,
    },
  };
};
