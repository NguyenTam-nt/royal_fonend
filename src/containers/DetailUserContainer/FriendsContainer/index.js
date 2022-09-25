import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../../actions/user";
import styles from "./style.module.scss";
// import { useNavigate } from "react-router-dom";
import FriendPage from "../../../component/DetailUser/FriendPage";
import ModalConfirm from "./ModalConfirm";
function FriendsContainer(props) {
  const { user, userCreators, posts } = props;
  const { listUserFriendOfUserDetail, currenUser } = user;
  const { userSelectLink } = posts;
  const [currenFriend, setCurrentFriend] = useState({});
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    const { getUserFriendDetail } = userCreators;
    getUserFriendDetail(userSelectLink._id);
  }, [userCreators, userSelectLink]);

  //confirm un friend
  const confirmUnfriend = (id, username) => {
    setCurrentFriend({ id, username });
    setShowModalConfirm(true);
  };

  //un friend real
  const unFriend = (id) => {
    const { unFriendUser } = userCreators;
    unFriendUser(id);
    setShowModalConfirm(false);
  };

  return (
    <div className={styles.backgound}>
      <FriendPage
        listUser={listUserFriendOfUserDetail}
        confirmUnfriend={confirmUnfriend}
        currenUser={currenUser}
        userSelectLink={userSelectLink}
      />
      <ModalConfirm
        open={isShowModalConfirm}
        currenFriend={currenFriend}
        onClose={() => setShowModalConfirm(false)}
        unFriend={unFriend}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  userCreators: bindActionCreators(actionUser, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(FriendsContainer);
