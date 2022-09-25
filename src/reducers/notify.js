import * as types from "../contains/senNotify";

const initialState = {
  notifys: [],
  notifysAction: [],
};

const notify = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_NOTIFY_ADD_FRIEND_SUCCESS:
      console.log(action.payload.notify);
      return {
        ...state,
        notifysAction: [action.payload.notify].concat(state.notifysAction),
      };

    case types.ACCEPT_ADDFRIEND:
      const { id } = action.payload;
      const notifysActions = state.notifysAction;
      const newNotifiAction = notifysActions.filter((noti) => noti._id !== id);
      return {
        ...state,
        notifysAction: { ...newNotifiAction },
      };

    case types.ACCEPT_ADDFRIEND_SUCCESS:
      const { notifys } = state;

      return {
        ...state,
        notifys: [action.payload.notify].concat(notifys),
      };

    case types.GET_NOTIFY_SUCCESS:
      return {
        ...state,
        notifys: action.payload.notifys,
      };

    case types.GET_NOTIFY_ADD_FRIEND_SUCCESS:
      return {
        ...state,
        notifysAction: action.payload.notifys,
      };

    default:
      return {
        ...state,
      };
  }
};

export default notify;
