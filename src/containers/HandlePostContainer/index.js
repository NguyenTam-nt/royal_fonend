import React, { useState } from "react";
// import styles from "./style.module.scss";
import HandlePost from "../../component/HandlePost";
import * as actionPost from "../../actions/posts";
import * as actionModal from "../../actions/modal";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ComfrimHandlePost from "../ModalContainer/ConfirmHanlePost";
import UpdatePostContainer from "../UpdatePostContainer";
// import { useNavigate } from "react-router-dom";

function HandlePostContainer(props) {
  const { user, post, actionModal, slug } = props;
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();
  const comfirmPost = () => {
    const { showModal } = actionModal;
    showModal(<ComfrimHandlePost post={post} />);
  };

  const closeModal = () => {
    const { hideModal } = actionModal;
    hideModal();
  };

  const showDialogUpdate = () => {
    setShow(true);
    // hideModal();
  };
  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <UpdatePostContainer
        user={user.currenUser}
        post={post}
        isShow={show}
        onClose={onClose}
      />

      <HandlePost
        user={user.currenUser}
        post={post}
        slug={slug}
        comfirmPost={comfirmPost}
        showDialogUpdate={showDialogUpdate}
        closeModal={closeModal}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionPostCreator: bindActionCreators(actionPost, dispatch),
    actionModal: bindActionCreators(actionModal, dispatch),
  };
};

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(HandlePostContainer);
