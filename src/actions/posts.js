import * as types from "../contains/posts";

export const getPost = () => {
  return {
    type: types.GET_POST,
  };
};

export const getPostSuccess = (posts) => {
  return {
    type: types.GET_POST_SUCCESS,
    payload: {
      posts,
    },
  };
};

export const getPostFail = (error) => {
  return {
    type: types.GET_POST_FAIL,
    payload: {
      error,
    },
  };
};

export const addPost = (post) => {
  return {
    type: types.ADD_POST,
    payload: {
      post,
    },
  };
};

export const addPostSuccess = (post) => {
  return {
    type: types.ADD_POST_SUCCESS,
    payload: {
      post,
    },
  };
};

export const addPostFail = (error) => {
  return {
    type: types.ADD_POST_FAIL,
    payload: {
      error,
    },
  };
};

export const updatePost = (post) => {
  return {
    type: types.UPDATE_POST,
    payload: {
      post,
    },
  };
};
export const updatePostSuccess = (post) => {
  return {
    type: types.UPDATE_POST_SUCCESS,
    payload: {
      post,
    },
  };
};

export const likePost = (data) => {
  return {
    type: types.LIKE_POST,
    payload: {
      data,
    },
  };
};

export const likePostSucess = (post) => {
  return {
    type: types.LIKE_POST_SUCESS,
    payload: {
      post,
    },
  };
};

export const getCurrenUserLikePost = () => {
  return {
    type: types.GET_CURENT_USER_LIKE_POST,
  };
};

export const getCurrenUserLikePostSuccess = (users) => {
  return {
    type: types.GET_CURENT_USER_LIKE_POST_SUCCESS,
    payload: {
      users,
    },
  };
};

export const addComment = (data) => {
  return {
    type: types.ADD_COMMENT,
    payload: {
      data,
    },
  };
};

export const addCommentSuccess = (comment) => {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    payload: {
      comment,
    },
  };
};

export const deletePost = (idpost) => {
  return {
    type: types.DELETE_POST,
    payload: {
      idpost,
    },
  };
};

export const deletePostSuccess = (idpost) => {
  return {
    type: types.DELETE_POST_SUCCESS,
    payload: {
      idpost,
    },
  };
};

export const getPostOfUser = (name) => {
  return {
    type: types.GET_POST_OF_CURRUSER,
    payload: {
      name,
    },
  };
};

export const getPostOfUserSuccess = (data) => {
  return {
    type: types.GET_POST_OF_CURRUSER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const clearPostOfUser = () => {
  return {
    type: types.CLEAR_POST_OF_USER,
  };
};

export const editSubText = (data) => {
  return {
    type: types.EDIT_SUBTEXT,
    payload: {
      data,
    },
  };
};

export const editSubTextSuccess = (user) => {
  return {
    type: types.EDIT_SUBTEXT_SUCCESS,
    payload: {
      user,
    },
  };
};

export const editProfile = (data) => {
  return {
    type: types.EDIT_PROFILE,
    payload: {
      data,
    },
  };
};

export const editProfileSuccess = (user) => {
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    payload: {
      user,
    },
  };
};

export const editUserExten = (data) => {
  return {
    type: types.EDIT_USER_EXTEN,
    payload: {
      data,
    },
  };
};

export const editUserExtenSuccess = (user) => {
  return {
    type: types.EDIT_USER_EXTEN_SUCCESS,
    payload: {
      user,
    },
  };
};

export const getImagesOfUser = (iduser) => {
  return {
    type: types.GET_IMAGES_CURREN_USER_SELECT,
    payload: {
      iduser,
    },
  };
};

export const getImagesOfUserSuccess = (listImage) => {
  return {
    type: types.GET_IMAGES_CURREN_USER_SELECT_SC,
    payload: {
      listImage,
    },
  };
};

export const searchPost = (keyword) => {
  return {
    type: types.SEARCH_POST,
    payload: {
      keyword,
    },
  };
};

export const searchPostSuccess = (listPost) => {
  return {
    type: types.SEARCH_POST_SUCCESS,
    payload: {
      listPost,
    },
  };
};
