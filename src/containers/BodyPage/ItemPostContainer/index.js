import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import * as actionModal from "../../../actions/modal";
import styles from "./style.module.scss";
import clsx from "clsx";
import Comment from "../../../component/BodyPage/ListPost/Comment";
import HeartLike from "../../../component/BodyPage/ListPost/HeartLike";
import HeaderUser from "../../../component/BodyPage/ListPost/HeaderUser";
import InputComment from "../../../component/BodyPage/ListPost/InputComment";
import HandlePostContainer from "../../HandlePostContainer";
import PostContent from "../../../component/BodyPage/ListPost/PostConten";
import socket from "../../ListenServerSoket";

import * as actionAnimation from "../../../actions/animation";
function ItemPostContainer(props) {
  const { post, postCreators, modalCreators, user, isDetail, showAll } = props;

  const [currenPost, setCurrentPost] = useState(post);

  //lắng nghe enven từ server
  useEffect(() => {
    if (post) {
      const { likePostSucess, addCommentSuccess } = postCreators;
      socket.on(post._id + "_like", (datas) => {
        if (datas) {
          const newPost = currenPost;

          let { data, isLike } = datas;

          if (!isLike) {
            newPost.liked.forEach((id, index) => {
              if (id === data.iduser) {
                newPost.liked.splice(index, 1);
              }
            });
          } else {
            const loop = newPost.liked.some((id) => id === data.iduser);
            if (!loop) {
              newPost.liked.push(data.iduser);
            }
          }

          setCurrentPost({ ...newPost });
          likePostSucess(datas);
        }
      });

      socket.on(post._id + "_comment", (data) => {
        if (data) {
          const newPost = currenPost;
          const check = newPost.comments.some((po) => po._id === data._id);
          if (!check) {
            newPost.comments.unshift(data);
          }

          setCurrentPost({ ...newPost });
          addCommentSuccess({ data, idpost: post._id });
        }
      });

      socket.on(post._id + "_deletePostSuccess", (post) => {
        if (post.idpost === currenPost._id) {
          setCurrentPost(null);

          const { deletePostSuccess } = postCreators;
          deletePostSuccess(post.idpost);
        }
      });

      socket.on(`${post._id}_update_post`, (post) => {
        const postUpdate = currenPost;
        postUpdate.content = post.content;
        postUpdate.image = post.image;
        postUpdate.video = post.video;
        postUpdate.isPublic = post.isPublic;
        setCurrentPost({ ...postUpdate });
        const { updatePostSuccess } = postCreators;
        updatePostSuccess(postUpdate);
      });
    }
  }, [post, postCreators, currenPost]);

  //like post and unlike
  const handleLikePost = (idpost) => {
    const { likePost } = postCreators;
    likePost({ idpost, iduser: user._id });
  };

  //add comment
  const subMitComment = (commentPost) => {
    const { addComment } = postCreators;
    addComment(commentPost);
  };

  //show dialog handle posts
  const handlePost = (post) => {
    const { showModal } = modalCreators;
    showModal(<HandlePostContainer post={post} />);
  };

  return currenPost ? (
    <div
      className={clsx(styles.container, {
        [styles.container_detail]: isDetail,
      })}
    >
      <div className={clsx("row")}>
        <div
          className={clsx(
            "col-12",
            "col-sm-12",
            "col-md-12",
            styles.background
          )}
        >
          <div className={clsx(styles.background__post)}>
            <div className={styles.background__post_detail_item1}>
              <HeaderUser
                post={currenPost && currenPost}
                user={user}
                handlePost={handlePost}
              />
            </div>
            <div className={styles.background__post_detail_item}>
              <PostContent post={currenPost && currenPost} showAll={showAll} />
            </div>
            <div className={styles.background__post_detail_item2}>
              <HeartLike
                post={currenPost && currenPost}
                likePost={handleLikePost}
                user={user}
              />
              {/* commented */}
              {currenPost.comments ? (
                <Comment
                  post={currenPost && currenPost}
                  user={user}
                  showAll={showAll}
                />
              ) : (
                ""
              )}
              <div className={styles.input_comment_item}>
                <InputComment
                  post={currenPost && currenPost}
                  user={user}
                  subMitComment={subMitComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

const mapStateToProps = (state) => ({
  // user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
  animationCreator: bindActionCreators(actionAnimation, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(ItemPostContainer);
