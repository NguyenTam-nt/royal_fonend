import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../actions/posts";
import * as actionUser from "../../actions/user";
import * as actionModal from "../../actions/modal";
import styles from "./style.module.scss";
import DetailUser from "../../component/DetailUser";
import { Outlet, useParams } from "react-router-dom";
import EditProfileContainer from "./EditProfileContainer";

function DetailUserContainer(props) {
  const { posts, user, postCreators } = props;
  const { currenUser, usersSelectLink } = user;
  const { userSelectLink } = posts;
  const params = useParams();

  const [isShowEditProfile, setShow] = useState(false);

  useEffect(() => {
    const { clearPostOfUser } = postCreators;
    if (params._u !== userSelectLink.username) {
      clearPostOfUser();
    }
  }, [postCreators, params._u, userSelectLink]);

  //edit subtext
  const submitSubText = (subText) => {
    const { editSubText } = postCreators;

    editSubText({ iduser: currenUser._id, subText });
  };

  //open modal edit profile
  const openPhoto = () => {
    setShow(true);
  };

  //close modal edit profile
  const closeModal = () => {
    setShow(false);
  };

  return (
    <div className={styles.backgound}>
      <div className={styles.container}>
        <DetailUser
          about={userSelectLink}
          currenUser={currenUser}
          submitSubText={submitSubText}
          openPhoto={openPhoto}
          countFriend={usersSelectLink?.count}
        />
        <div className={styles.body_detail}>
          <Outlet />
        </div>
        {isShowEditProfile ? (
          <EditProfileContainer
            isShowEditProfile={isShowEditProfile}
            closeModal={closeModal}
          />
        ) : (
          ""
        )}
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
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(DetailUserContainer);
