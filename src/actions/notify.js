import * as types from "../contains/senNotify";

export const sendNotifyAddFriend = (data) => {
  return {
    type: types.SEND_NOTIFY_ADD_FRIEND,
    payload: {
      data,
    },
  };
};

export const sendNotifyAddFriendSuccess = (notify) => {
  return {
    type: types.SEND_NOTIFY_ADD_FRIEND_SUCCESS,
    payload: {
      notify,
    },
  };
};

export const acceptAddFriend = (id) => {
  return {
    type: types.ACCEPT_ADDFRIEND,
    payload: {
      id,
    },
  };
};

export const acceptAddFriendSuccess = (notify) => {
  return {
    type: types.ACCEPT_ADDFRIEND_SUCCESS,
    payload: {
      notify,
    },
  };
};

export const getNotify = (idUser) => {
  return {
    type: types.GET_NOTIFY,
    payload: {
      idUser,
    },
  };
};

export const getNotifySuccess = (notifys) => {
  return {
    type: types.GET_NOTIFY_SUCCESS,
    payload: {
      notifys,
    },
  };
};

export const getNotifyAddFriend = (idUser) => {
  return {
    type: types.GET_NOTIFY_ADD_FRIEND,
    payload: {
      idUser,
    },
  };
};

export const geNotifyAddFriendSuccess = (notifys) => {
  return {
    type: types.GET_NOTIFY_ADD_FRIEND_SUCCESS,
    payload: {
      notifys,
    },
  };
};
