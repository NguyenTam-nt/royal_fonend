import React from "react";
// import styles from "./style.module.scss";
import AddPost from "../../component/AddPost";
import * as actionPost from "../../actions/posts";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Modal } from "@mui/material";

// import clsx from "clsx";

function AddPosModal(props) {
  const { actionPostCreator, user } = props;

  const subMitForm = (data) => {
    const { addPost } = actionPostCreator;
    addPost(data);
    props.onClose();
  };
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={props.onClose}
      open={true}
    >
      <div>
        <AddPost user={user.currenUser} addPost={subMitForm} />;
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
  };
};

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(AddPosModal);
