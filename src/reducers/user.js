import * as types from "../contains/user";

const initialState = {
  authorization: "",
  isSignUp: false,
  isLogin: localStorage.getItem("refreshToken") ? true : false,
  userFriend: sessionStorage.getItem("_user_online")
    ? JSON.parse(sessionStorage.getItem("_user_online"))
    : [],
  currenUser: localStorage.getItem("_u")
    ? JSON.parse(localStorage.getItem("_u"))
    : {},
  listUserSearch: [],
  usersSelectLink: {},
  listUserFriendOfUserDetail: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUp: true,
      };

    case types.LOGIN_USER_SUCCESS:
      let { user, refreshToken, accessToken } = action.payload.data;

      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      localStorage.setItem(
        "accessToken",
        JSON.stringify("Bearer " + accessToken)
      );
      localStorage.setItem("_u", JSON.stringify(user));
      return {
        ...state,
        isLogin: true,
        currenUser: user,
      };

    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        isLogin: false,
      };
    case types.REFRESH_TOKEN_SUCCESS:
      console.log(action.payload.token);
      let accessTokenRefresh = action.payload.token.refreshToken;
      localStorage.setItem(
        "accessToken",
        JSON.stringify("Bearer " + accessTokenRefresh)
      );
      localStorage.setItem("_u", JSON.stringify(action.payload.token.user));

      return {
        ...state,
        isLogin: true,
        currenUser: action.payload.token.user,
      };

    case types.REFRESH_TOKEN_FAIL:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("_u");
      sessionStorage.removeItem("_user_online");
      localStorage.removeItem("refreshToken");
      console.log("logout");
      return {
        ...state,
        isLogin: false,
      };

    case types.GET_USER_FRIEND_LINK_SUCCESS:
      return {
        ...state,
        usersSelectLink: action.payload.data,
      };

    case types.GET_USER_FRIEND_SUCCESS:
      sessionStorage.setItem(
        "_user_online",
        JSON.stringify(action.payload.users)
      );
      return {
        ...state,
        userFriend: action.payload.users,
      };

    case types.SEARCH_USER_SUCCESS:
      return {
        ...state,
        listUserSearch: action.payload.listUser,
      };

    case types.CLEAR_USER_SEARCH:
      return {
        ...state,
        listUserSearch: [],
      };

    case types.USER_ONLINE:
      let usersFriend = state.userFriend;
      const check = usersFriend.some(
        (us) => us._id === action.payload.data._id
      );

      if (!check) {
        usersFriend = [action.payload.data].concat(usersFriend);
      }

      sessionStorage.setItem("_user_online", JSON.stringify(usersFriend));

      return {
        ...state,
        userFriend: usersFriend,
      };

    case types.USER_OFFLINE:
      const ListUserFriends = state.userFriend;
      ListUserFriends.forEach((user, index) => {
        if (user._id === action.payload.id) {
          ListUserFriends.splice(index, 1);
        }
      });

      sessionStorage.setItem("_user_online", JSON.stringify(ListUserFriends));

      return {
        ...state,
        userFriend: ListUserFriends,
      };

    case types.GET_FRIEND_DETAIL_SUCCESS:
      return {
        ...state,
        listUserFriendOfUserDetail: action.payload.listUser,
      };

    case types.UN_FRIEND_SUCCESS:
      const listUserfriend = state.listUserFriendOfUserDetail;
      listUserfriend.forEach((us, index) => {
        if (us._id === action.payload.id) {
          listUserfriend.splice(index, 1);
        }
      });
      return {
        ...state,
        listUserFriendOfUserDetail: listUserfriend,
      };

    default:
      return { ...state };
  }
};

export default user;
