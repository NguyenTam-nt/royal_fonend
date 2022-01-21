import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import EditProfile from "../../../component/DetailUser/EditProfile";
import styles from "./style.module.scss";
import { Modal } from "@mui/material";
function EditProfileContainer(props) {
  const {
    posts,
    isShowEditProfile,
    postCreators,
    // user,
  } = props;

  const { userSelectLink } = posts;

  const handleProfile = (data) => {
    const { editProfile } = postCreators;
    editProfile({ fileProfile: data.profile, fileCoverPhoto: data.coverPhoto });
    props.closeModal();
  };

  return (
    <Modal
      className={styles.background}
      open={isShowEditProfile}
      onClose={props.closeModal}
    >
      <div>
        <EditProfile
          about={userSelectLink}
          hideModal={props.closeModal}
          sendProfile={handleProfile}
        />
      </div>
    </Modal>
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

export default compose(widthConnect)(EditProfileContainer);
