import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import * as actionModal from "../../../actions/modal";
import ListMyFrient from "../../../component/BodyPage/ListMyFriend";
import NewsFriend from "../../../component/NewsFriend";
import { FaUserPlus } from "react-icons/fa";
import styles from "./style.module.scss";
import clsx from "clsx";
import socket from "../../ListenServerSoket";
import ListUserConainer from "../../ListUserConainer";
import ShowMainNotifyContainer from "../../ShowMainNotifyContainer";
import * as actionAnimation from "../../../actions/animation";
import Loading from "../../Loading";
import ItemPostContainer from "../ItemPostContainer";
function BodyPagePry(props) {
  const {
    posts,
    postCreators,
    modalCreators,
    userCreators,
    user,
    animationCreator,
  } = props;
  const { listPosts } = posts;
  const { currenUser, userFriend } = user;
  const refPosts = React.useRef();

  //lắng nghe enven từ server
  React.useEffect(() => {
    socket.on(currenUser.username + "_getPost", (data) => {
      const { posts } = data;
      const { getPostSuccess } = postCreators;
      const { hideLoading } = animationCreator;
      getPostSuccess(posts);
      hideLoading();
    });

    socket.on("get_user_online", (data) => {
      const { getUserFriendSuccess } = userCreators;
      getUserFriendSuccess(data);
    });

    socket.on("user_had_online", (data) => {
      const { userOnline } = userCreators;
      console.log({ data });
      userOnline(data);
    });

    socket.on("user_had_offline", (id) => {
      const { userOffline } = userCreators;

      userOffline(id);
    });
  }, [currenUser, animationCreator, postCreators, userCreators]);

  //print post loaded
  const ShowPost = () => {
    let xhtml = null;
    if (listPosts) {
      xhtml = listPosts?.map((post, index) => {
        return (
          <ItemPostContainer
            post={post}
            socket={socket}
            key={index}
            user={currenUser}
          />
        );
      });
    }

    return xhtml;
  };

  //show dialog list user to add friend
  const showListUser = async () => {
    const { showModal } = modalCreators;
    const { getUserNoFriend } = userCreators;
    await getUserNoFriend(currenUser._id);
    showModal(<ListUserConainer />);
  };

  //handle load post when srcoll bottom
  useEffect(() => {
    let timeout;
    window.addEventListener("scroll", () => {
      let loadData =
        refPosts.current &&
        refPosts.current.getBoundingClientRect().bottom > 1300
          ? refPosts.current.getBoundingClientRect().bottom
          : 2000;

      const { showLoading } = animationCreator;
      if (loadData <= 1500) {
        clearTimeout(timeout);
        const { getPost } = postCreators;
        timeout = setTimeout(() => {
          showLoading();
          getPost();
          loadData = 2000;
        }, 500);
      } else {
        loadData = 2000;
      }
    });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", () => {});
    };
  }, [postCreators, animationCreator]);

  //handle get post, refresh token
  useEffect(() => {
    const { getPost } = postCreators;
    const { showLoading } = animationCreator;
    showLoading();
    getPost();
  }, [postCreators, animationCreator]);

  return (
    <div className={clsx("row")}>
      <div className={clsx("col", "col-sm-0", "col-md-3", "col-lg-2")}></div>
      <div className={clsx("col-12", "col-sm-12", "col-md-5", "col-lg-6")}>
        <div className={styles.news_list}>
          <NewsFriend />
        </div>
        <div className={styles.backgroud_post} ref={refPosts}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ShowPost()}
          </div>
          <Loading />
        </div>
      </div>
      <div className={clsx("col-auto", "col-sm-0", "col-md-4", "col-lg-3")}>
        <div className={styles.right__0}>
          <ShowMainNotifyContainer />
          <ListMyFrient userFriend={userFriend} />
        </div>
        <div className={styles.list_user_style} onClick={showListUser}>
          <FaUserPlus className={styles.list_user_style_icon} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
  animationCreator: bindActionCreators(actionAnimation, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(BodyPagePry);
