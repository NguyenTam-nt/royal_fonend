import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import * as actionModal from "../../../actions/modal";
import * as actionAnimation from "../../../actions/animation";
import styles from "./style.module.scss";
import Intro from "../../../component/DetailUser/Intro";
import Friends from "../../../component/DetailUser/Friends";
import ItemPostContainer from "../../BodyPage/ItemPostContainer";
import Loading from "../../Loading";
import clsx from "clsx";
import { useParams } from "react-router-dom";
function PostsContainer(props) {
  const {
    postCreators,
    posts,
    user,
    animation,
    animationCreators,
    userCreators,
  } = props;
  const { listPostOfCurrent, userSelectLink } = posts;
  const { currenUser, usersSelectLink } = user;
  const { isLoading } = animation;
  const params = useParams();
  const __currenUserSelect = params._u;
  const refPosts = React.useRef();

  useEffect(() => {
    const { getPostOfUser } = postCreators;
    const { showLoading } = animationCreators;
    const { getUserFriend } = userCreators;
    if (
      !listPostOfCurrent[0] &&
      listPostOfCurrent[0]?.username !== __currenUserSelect
    ) {
      getPostOfUser(__currenUserSelect);
      getUserFriend({ name: __currenUserSelect, limit: 9 });
      showLoading();
    }
  }, [
    postCreators,
    __currenUserSelect,
    animationCreators,
    listPostOfCurrent,
    userCreators,
  ]);

  useEffect(() => {
    let timeout;
    window.addEventListener("scroll", () => {
      let loadData =
        refPosts.current &&
        refPosts.current.getBoundingClientRect().bottom > 1300
          ? refPosts.current.getBoundingClientRect().bottom
          : 2000;

      const { showLoading } = animationCreators;
      if (loadData <= 1500) {
        clearTimeout(timeout);
        const { getPostOfUser } = postCreators;
        timeout = setTimeout(() => {
          showLoading();
          getPostOfUser(__currenUserSelect);
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
  }, [postCreators, animationCreators, __currenUserSelect]);

  return (
    <div className={styles.backgound}>
      <div className="row">
        <div
          className={clsx(
            "col-",
            "col-sm-",
            "col-md-5",
            "col-lg-5",
            styles.side_intro
          )}
        >
          <div className={styles.side_intro_item}>
            <Intro intro={userSelectLink} currenUser={currenUser} />
            <Friends listFriend={usersSelectLink} />
          </div>
        </div>
        <div
          className={clsx("col-12", "col-sm-12", "col-md-7", "col-lg-7")}
          ref={refPosts}
        >
          {listPostOfCurrent[0] &&
            listPostOfCurrent[0].username === params._u &&
            listPostOfCurrent.map((post, index) => {
              return (
                <ItemPostContainer post={post} key={index} user={currenUser} />
              );
            })}
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
  animation: state.animation,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
  animationCreators: bindActionCreators(actionAnimation, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(PostsContainer);
