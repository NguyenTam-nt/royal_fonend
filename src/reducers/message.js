import * as types from "../contains/message";

const initialState = {
  rooms: [],
  currenRoom: null,
  messages: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        rooms: action.payload.rooms,
      };

    case types.SHOW_ROOM_MESSGE_SUCCESS:
      return {
        ...state,
        currenRoom: action.payload.room,
      };

    case types.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [action.payload.room].concat(state.rooms),
        currenRoom: action.payload.room,
      };

    case types.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [action.payload.messages].concat(state.messages),
      };

    case types.ADD_MESSAGE_SUCCESS:
      const messageAddSuccess = action.payload.message;
      const listMessagesAddSuccess = state.messages;
      const roomsList = state.rooms;
      const check = listMessagesAddSuccess.some(
        (ms) => ms._id === messageAddSuccess._id
      );

      if (!check) {
        listMessagesAddSuccess.forEach((ms) => {
          if (ms.idroom === messageAddSuccess.idroom) {
            ms.messages.push(messageAddSuccess);
          }
        });
        roomsList.forEach((room) => {
          if (room._id === messageAddSuccess.idroom) {
            room.mess = messageAddSuccess;
          }
        });
      }

      return {
        ...state,
        messages: listMessagesAddSuccess,
        rooms: roomsList,
      };

    default:
      return {
        ...state,
      };
  }
};

export default message;
