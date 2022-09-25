import React from "react";
import * as actionPost from "../../actions/posts";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import UpdatePost from "../../component/UpdatePost";
import { Modal } from "@mui/material";
import * as actionModal from "../../actions/modal";

// import clsx from "clsx";

function UpdatePostModal(props) {
  const { user, post, isShow, actionPostCreator, actionModalCreator } = props;
  // const navigate = useNavigate();

  const subMitForm = (data) => {
    const { updatePost } = actionPostCreator;
    const { hideModal } = actionModalCreator;

    updatePost(data);
    hideModal();
  };
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isShow}
      onClose={props.onClose}
    >
      <div>
        <UpdatePost user={user.currenUser} addPost={subMitForm} post={post} />;
      </div>
    </Modal>
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
    actionModalCreator: bindActionCreators(actionModal, dispatch),
  };
};

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(UpdatePostModal);
