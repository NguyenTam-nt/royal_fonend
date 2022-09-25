import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import About from "../../../component/DetailUser/About";
import styles from "./style.module.scss";
function AboutContainer(props) {
  const { posts, postCreators, user } = props;
  const { userSelectLink } = posts;
  const { currenUser } = user;
  const { editUserExten } = postCreators;
  const savePhone = (value) => {
    editUserExten({ field: "phone", text: value });
  };

  const saveUserFrom = (value) => {
    editUserExten({ field: "address", text: value });
  };

  const saveUserLive = (value) => {
    editUserExten({ field: "live_in", text: value });
  };

  return (
    <div className={styles.backgound}>
      <About
        user={userSelectLink}
        savePhone={savePhone}
        saveUserFrom={saveUserFrom}
        saveUserLive={saveUserLive}
        currenUser={currenUser}
      />
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
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(AboutContainer);
