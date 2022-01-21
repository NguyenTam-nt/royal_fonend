import * as types from "../contains/message";

export const getRoom = (iduser) => {
  return {
    type: types.GET_ROOM_MESSAGE,
    payload: {
      iduser,
    },
  };
};

export const getRoomSuccess = (rooms) => {
  return {
    type: types.GET_ROOM_MESSAGE_SUCCESS,
    payload: {
      rooms,
    },
  };
};

export const showRoom = (iduser) => {
  return {
    type: types.SHOW_ROOM_MESSGE,
    payload: {
      iduser,
    },
  };
};

export const showRoomSuccess = (room) => {
  return {
    type: types.SHOW_ROOM_MESSGE_SUCCESS,
    payload: {
      room,
    },
  };
};

export const showRoomFail = (error) => {
  return {
    type: types.SHOW_ROOM_MESSGE_FAIL,
    payload: {
      error,
    },
  };
};

export const createRoomSuccess = (room) => {
  return {
    type: types.CREATE_ROOM_SUCCESS,
    payload: {
      room,
    },
  };
};

export const getMessage = (idRoom) => {
  return {
    type: types.GET_MESSAGE,
    payload: {
      idRoom,
    },
  };
};

export const getMessageSuccess = (messages) => {
  return {
    type: types.GET_MESSAGE_SUCCESS,
    payload: {
      messages,
    },
  };
};

export const addMessage = (message) => {
  return {
    type: types.ADD_MESSAGE,
    payload: {
      message,
    },
  };
};

export const addMessageSuccess = (message) => {
  return {
    type: types.ADD_MESSAGE_SUCCESS,
    payload: {
      message,
    },
  };
};
