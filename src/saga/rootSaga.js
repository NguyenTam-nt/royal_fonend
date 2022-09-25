import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import * as typesUser from "../contains/user";
import * as typesPost from "../contains/posts";
import * as typesNotify from "../contains/senNotify";
import * as typesMessage from "../contains/message";

import * as apiUser from "../Api/user";
import * as apiPost from "../Api/post";
import * as apiNotify from "../Api/notify";
import * as apiMessage from "../Api/message";

import * as actionUser from "../actions/user";
import * as actionAnimation from "../actions/animation";
import * as actionPost from "../actions/posts";
import * as actionModal from "../actions/modal";
import * as actionNotify from "../actions/notify";
import * as actionMessage from "../actions/message";

function* showErrorMessages(message) {
  const { showErrorMessage, hideErrorMessage } = actionAnimation;
  yield put(showErrorMessage(message));
  yield delay(7000);
  yield put(hideErrorMessage());
}

function* createUserMethod({ payload }) {
  const { data } = payload;

  const res = yield call(apiUser.post, { query: "add-user", data });

  try {
    if (res.data.status === 401) {
      yield showErrorMessages(
        "Email này đã được đăng ký, vui lòng dùng email khác"
      );
    } else {
      yield put(actionUser.signUpSuccess());
    }
  } catch (error) {
    yield* showErrorMessages("Kiểm tra lại đường truyền mạng của bạn");
  }
}

function* signUpEmailMethod({ payload }) {
  const { email } = payload;

  const res = yield call(apiUser.post, {
    query: "sign-up/email",
    data: { email },
  });
  try {
    if (res.data.status === 401) {
      yield showErrorMessages(
        "Email này đã được đăng ký, vui lòng dùng email khác"
      );
    }
  } catch (error) {
    yield* showErrorMessages("Kiểm tra lại đường truyền mạng của bạn");
  }
}

function* loginUserMethod({ payload }) {
  const { data } = payload;
  const res = yield call(apiUser.post, { query: "login-user", data });
  try {
    if (res.data.status === 401) {
      yield showErrorMessages("Tài khoản không hợp lệ, vui lòng kiểm tra lại");
    } else {
      yield put(
        actionUser.loginUserSuccess({
          user: res.data.user,
          refreshToken: res.data.refreshToken,
          accessToken: res.data.accessToken,
        })
      );
    }
  } catch (error) {
    yield showErrorMessages("Kiểm tra lại đường truyền mạng của bạn");
  }
}

// function* refreshTokenMethod({ payload }) {
//   const { type } = payload;
//   const res = yield call(apiUser.post, {
//     query: "refresh-token",
//     data: {
//       refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
//       type,
//     },
//   });

//   try {
//     if (res.data.status === 200) {
//       if (type === "getpost") {
//         sessionStorage.removeItem("accessToken");
//         // const { showLoading, hideLoading } = actionAnimation;
//         const post = yield select((state) => state.posts);
//         const { limit, skip } = post;

//         // yield put(showLoading());
//         const resp = yield call(apiPost.get, {
//           params: `?limit=${limit}&skip=${skip}`,
//           config: {
//             headers: { Authorization: "Bearer " + res.data.accessToken },
//           },
//         });

//         try {
//           if (resp.data.status === 200) {
//             yield put(actionPost.getPostSuccess(resp.data.posts));
//             yield put(
//               actionUser.refreshTokenSuccess({
//                 refreshToken: res.data.accessToken,
//                 user: res.data.user,
//               })
//             );
//           }
//         } catch (error) {}
//       }
//     } else {
//       yield put(actionUser.refreshTokenFail());
//     }
//   } catch (error) {}
// }

function* getPostMethod() {
  const { hideLoading } = actionAnimation;
  const post = yield select((state) => state.posts);
  const { limit, skip } = post;

  // yield put(showLoading());
  const res = yield call(apiPost.get, {
    params: `?limit=${limit}&skip=${skip}`,
  });

  console.log(res);
  try {
    if (res.data.status === 200) {
      yield put(actionPost.getPostSuccess(res.data.posts));
      hideLoading();
    } else {
      yield put(actionUser.refreshTokenFail());
    }
  } catch (error) {
    yield put(actionUser.refreshTokenFail());
  }
}

function* addPostMethod({ payload }) {
  const { post } = payload;
  const formData = new FormData();
  formData.append("thumbnail", post.files[0]);
  formData.append("content", post.content);
  formData.append("isPublic", post.isPublic);
  const res = yield call(apiPost.post, { query: "add-post", data: formData });
  try {
    yield put(actionModal.hideModal());

    yield put(actionPost.addPostSuccess(res.data.data));
  } catch (error) {}
}

function* updatePostMethod({ payload }) {
  const { post } = payload;

  const formData = new FormData();
  formData.append("image", post.image);
  formData.append("video", post.video);
  formData.append("content", post.content);
  formData.append("_id", post._id);
  formData.append("isPublic", post.isPublic);
  yield call(apiPost.post, { query: "update-post", data: formData });
}

function* likePostMethod({ payload }) {
  const { data } = payload;
  yield call(apiPost.post, { query: "like-post", data });
}
function* getCurrenUserLikePostMethod() {
  const res = yield call(apiPost.get, "get-curuser-like");

  try {
    yield put(actionPost.getCurrenUserLikePostSuccess(res.data));
  } catch (error) {}
}

function* addCommentMethod({ payload }) {
  const { data } = payload;
  console.log(data);
  yield call(apiPost.post, { query: "add-comment", data });
}

function* getUserNoFriendMethod({ payload }) {
  const { id } = payload;
  yield call(apiUser.get, `get-users?id=${id}`);
}

function* getUserFriendMethod({ payload }) {
  const { data } = payload;

  const res = yield call(
    apiUser.get,
    `user-friend?name=${data.name}&limit=${data.limit}`
  );
  try {
    yield put(
      actionUser.getUserLinkSelect({
        users: res.data.list,
        count: res.data.count,
      })
    );
  } catch (error) {}
}

function* sendNotifyAddFriendMethod({ payload }) {
  const { data } = payload;
  const res = yield call(apiNotify.post, { params: "send-add-friend", data });
  try {
    console.log(res);
  } catch (error) {}
}

function* acceptAddFriendMethod({ payload }) {
  const { id } = payload;
  console.log(id);
  yield call(apiNotify.post, { params: "accept-friend", data: { id } });
}

function* getNotifyMethod({ payload }) {
  const { idUser } = payload;
  yield call(apiNotify.get, { params: `get-notify?_u=${idUser}` });
}

function* getNotifyAddFriendMethod({ payload }) {
  const { idUser } = payload;
  const res = yield call(apiNotify.get, {
    params: `notify-action?_u=${idUser}`,
  });
  try {
    yield put(actionNotify.geNotifyAddFriendSuccess(res.data.notifys));
  } catch (error) {}
}

function* deletePostMethod({ payload }) {
  const { idpost } = payload;
  yield call(apiPost.post, {
    query: "delete-post",
    data: { idpost },
  });
}

function* searchUserFriendMethod({ payload }) {
  yield delay(1000);
  const { keyword } = payload;
  const user = yield select((state) => state.user.currenUser);
  const res = yield call(
    apiUser.get,
    `get-user/search?keyword=${keyword}&_u=${user._id}`
  );
  try {
    yield put(actionUser.searchUserSuccess(res.data.doc));
  } catch (error) {}
}

function* getRoomMethod({ payload }) {
  const { iduser } = payload;
  const res = yield call(apiMessage.get, `get-room?_u=${iduser}`);
  try {
    yield put(actionMessage.getRoomSuccess(res.data.rooms));
    yield put(actionAnimation.hideLoading());
  } catch (error) {}
}

function* showRoomMethod({ payload }) {
  const { iduser } = payload;
  const user = yield select((state) => state.user.currenUser);
  yield call(apiMessage.post, {
    query: "create-room",
    data: { _u: iduser, _cu: user._id },
  });
}

function* getMessageMethod({ payload }) {
  const { idRoom } = payload;

  const res = yield call(apiMessage.get, `get-messages?_r=${idRoom}`);
  try {
    console.log(res);
    yield put(actionMessage.getMessageSuccess(res.data.messageOfRoom));
  } catch (error) {}
}

function* addMessageMethod({ payload }) {
  const { message } = payload;
  const formData = new FormData();
  formData.append("idroom", message.idroom);
  formData.append("iduser", message.iduser);
  formData.append("message", message.message.msg);
  formData.append("file", message.message.file);
  const res = yield call(apiMessage.post, {
    query: "add-message",
    data: formData,
  });

  try {
    yield put(actionMessage.addMessageSuccess(res.data.data));
  } catch (error) {}
}

function* getPostOfUserMethod({ payload }) {
  const { name } = payload;

  const { skipDetail, limit } = yield select((state) => state.posts);
  const res = yield call(apiPost.get, {
    params: `get-post/user?name=${name}&skip=${skipDetail}&limit=${limit}`,
  });

  try {
    if (res.data) {
      yield put(actionPost.getPostOfUserSuccess(res.data));
      yield put(actionAnimation.hideLoading());
    } else {
      yield put(actionAnimation.hideLoading());
    }
  } catch (error) {}
}

function* editSubTextMethod({ payload }) {
  const { iduser, subText } = payload.data;
  const res = yield call(apiUser.post, {
    query: "edit-subtext",
    data: { iduser, subText },
  });

  try {
    yield put(actionPost.editSubTextSuccess(res.data));
  } catch (error) {}
}

function* editProfileMethod({ payload }) {
  const { fileProfile, fileCoverPhoto } = payload.data;
  const formData = new FormData();
  formData.append("fileProfile", fileProfile);
  formData.append("fileCoverPhoto", fileCoverPhoto);
  const res = yield call(apiUser.post, {
    query: "edit-profile",
    data: formData,
  });
  try {
    yield put(actionPost.editProfileSuccess(res.data));
  } catch (error) {}
}

function* editUserExtentmethod({ payload }) {
  const { data } = payload;
  const res = yield call(apiUser.post, {
    query: "edit-user/extention",
    data,
  });
  try {
    yield put(actionPost.editUserExtenSuccess(res.data));
  } catch (error) {}
}

function* getUserFriendOfUserSelect({ payload }) {
  const { iduser } = payload;
  const res = yield call(apiUser.get, `get-friend/user-select?_id=${iduser}`);
  try {
    yield put(actionUser.getUserFriendDetailSuccess(res.data.users));
  } catch (error) {}
}

function* unFriendMethod({ payload }) {
  const { id } = payload;
  const res = yield call(apiUser.post, { query: "un-friend", data: { id } });
  try {
    yield put(actionUser.unFriendUserSuccess(res.data.id));
  } catch (error) {}
}

function* getImagesOfUserMethod({ payload }) {
  const { iduser } = payload;
  const res = yield call(apiPost.get, { params: `get-images?_u=${iduser}` });
  try {
    console.log(res.data.listImage);
    yield put(actionPost.getImagesOfUserSuccess(res.data));
  } catch (error) {}
}

function* searchPostMethod({ payload }) {
  const { keyword } = payload;
  yield delay(1000);
  const res = yield call(apiPost.get, {
    params: `search-post?keyword=${keyword}`,
  });
  try {
    console.log(res.data.listAll);
    // yield put(actionPost.searchPostSuccess(res.data.listAll));
  } catch (error) {}
}

function* rootSaga() {
  yield takeLatest(typesUser.SIGN_UP, createUserMethod);
  yield takeLatest(typesUser.SIGN_UP_EMAIL, signUpEmailMethod);
  yield takeLatest(typesUser.LOGIN_USER, loginUserMethod);
  // yield takeLatest(typesUser.REFRESHTOKEN, refreshTokenMethod);
  yield takeLatest(typesUser.GET_USER_NOFRIEND, getUserNoFriendMethod);
  yield takeLatest(typesUser.SEARCH_USER, searchUserFriendMethod);

  yield takeLatest(typesUser.GET_FRIEND_DETAIL, getUserFriendOfUserSelect);

  yield takeLatest(typesPost.GET_POST, getPostMethod);
  yield takeLatest(typesPost.ADD_POST, addPostMethod);
  yield takeLatest(typesPost.UPDATE_POST, updatePostMethod);
  yield takeLatest(typesPost.DELETE_POST, deletePostMethod);
  yield takeLatest(typesPost.ADD_COMMENT, addCommentMethod);
  yield takeLatest(typesPost.LIKE_POST, likePostMethod);
  yield takeLatest(typesPost.SEARCH_POST, searchPostMethod);

  yield takeLatest(
    typesPost.GET_CURENT_USER_LIKE_POST,
    getCurrenUserLikePostMethod
  );

  yield takeLatest(
    typesPost.GET_IMAGES_CURREN_USER_SELECT,
    getImagesOfUserMethod
  );

  yield takeLatest(typesUser.UN_FRIEND, unFriendMethod);
  yield takeLatest(typesUser.GET_USER_FRIEND, getUserFriendMethod);
  yield takeLatest(typesPost.GET_POST_OF_CURRUSER, getPostOfUserMethod);
  yield takeLatest(typesPost.EDIT_SUBTEXT, editSubTextMethod);
  yield takeLatest(typesPost.EDIT_PROFILE, editProfileMethod);
  yield takeLatest(typesPost.EDIT_USER_EXTEN, editUserExtentmethod);

  yield takeLatest(
    typesNotify.SEND_NOTIFY_ADD_FRIEND,
    sendNotifyAddFriendMethod
  );

  yield takeLatest(typesNotify.ACCEPT_ADDFRIEND, acceptAddFriendMethod);
  yield takeLatest(typesNotify.GET_NOTIFY, getNotifyMethod);
  yield takeLatest(typesNotify.GET_NOTIFY_ADD_FRIEND, getNotifyAddFriendMethod);

  yield takeLatest(typesMessage.GET_ROOM_MESSAGE, getRoomMethod);
  yield takeLatest(typesMessage.SHOW_ROOM_MESSGE, showRoomMethod);
  yield takeLatest(typesMessage.GET_MESSAGE, getMessageMethod);
  yield takeLatest(typesMessage.ADD_MESSAGE, addMessageMethod);
}

export default rootSaga;
