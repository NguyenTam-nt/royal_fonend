import * as types from "../contains/posts";

const initialState = {
  listPosts: [],
  isLoading: false,
  userLikePost: [],
  listPostOfCurrent: [],
  userSelectLink: {},
  isGetPostLink: true,
  limit: 2,
  skip: 0,
  skipDetail: 0,
  listImage: [],
  listVideo: [],
  listPostSearch: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_POST_SUCCESS:
      let postslist = state.listPosts;
      let { skip } = state;
      skip += 2;
      postslist.push(...action.payload.posts);

      return {
        ...state,
        listPosts: postslist,
        isLoading: false,
        skip,
      };
    case types.GET_POST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case types.ADD_POST_SUCCESS:
      return {
        ...state,
        listPosts: state.listPosts.concat([action.payload.post]),
        listPostOfCurrent: state.listPostOfCurrent.concat([
          action.payload.post,
        ]),
        isLoading: false,
      };
    case types.ADD_POST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case types.UPDATE_POST_SUCCESS:
      const listPostUpdate = state.listPosts;
      listPostUpdate.forEach((pos, index) => {
        if (pos._id === action.payload.post._id) {
          listPostUpdate.splice(index, 1, action.payload.post);
        }
      });

      return {
        ...state,
        listPosts: listPostUpdate,
      };

    case types.LIKE_POST_SUCESS:
      let posts = state.listPosts;

      let { data, isLike } = action.payload.post;

      posts.forEach((post) => {
        if (post._id === data.idpost) {
          if (!isLike) {
            post.liked.forEach((id, index) => {
              if (id === data.iduser) {
                post.liked.splice(index, 1);
              }
            });
          } else {
            const loop = post.liked.some((id) => id === data.iduser);
            if (!loop) {
              post.liked.push(data.iduser);
            }
          }
        }
      });

      return {
        ...state,
        listPosts: posts,
      };

    case types.GET_CURENT_USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        userLikePost: action.payload.users,
      };

    // case types.ADD_COMMENT:
    //   return {
    //     ...state,
    //   };

    case types.ADD_COMMENT_SUCCESS:
      const listposts = state.listPosts;
      let { comment } = action.payload;
      listposts.forEach((post) => {
        if (post._id === comment.idpost) {
          const check = post.comments.some((po) => po._id === comment.data._id);
          if (!check) {
            post.comments.unshift(comment.data);
          }
        }
      });

      return {
        ...state,
        listPosts: listposts,
      };

    case types.DELETE_POST:
      return {
        ...state,
      };

    case types.DELETE_POST_SUCCESS:
      const postsNew = state.listPosts;
      postsNew.forEach((po, index) => {
        if (po._id === action.payload.idpost) {
          postsNew.splice(index, 1);
        }
      });
      return {
        ...state,
        listposts: postsNew,
      };

    case types.GET_POST_OF_CURRUSER_SUCCESS:
      const listPostcurren = state.listPostOfCurrent;
      listPostcurren.push(...action.payload.data.posts);
      return {
        ...state,
        listPostOfCurrent: listPostcurren,
        userSelectLink: action.payload.data.user,
        skipDetail: state.skipDetail + 2,
      };

    case types.CLEAR_POST_OF_USER:
      return {
        ...state,
        listPostOfCurrent: [],
        skipDetail: 0,
      };

    case types.EDIT_SUBTEXT_SUCCESS:
      sessionStorage.setItem("_u", JSON.stringify(action.payload.user));
      return {
        ...state,
        userSelectLink: action.payload.user,
      };

    case types.EDIT_PROFILE_SUCCESS:
      sessionStorage.setItem("_u", JSON.stringify(action.payload.user));

      return {
        ...state,
        userSelectLink: action.payload.user,
      };

    case types.EDIT_USER_EXTEN_SUCCESS:
      sessionStorage.setItem("_u", JSON.stringify(action.payload.user));

      return {
        ...state,
        userSelectLink: action.payload.user,
      };

    case types.GET_IMAGES_CURREN_USER_SELECT_SC:
      return {
        ...state,
        listImage: action.payload.listImage.listImage,
        listVideo: action.payload.listImage.listVideo,
      };

    case types.SEARCH_POST:
      return {
        ...state,
      };

    case types.SEARCH_POST_SUCCESS:
      return {
        ...state,
        listPostSearch: action.payload.listPost,
      };

    default:
      return { ...state };
  }
};

export default posts;
