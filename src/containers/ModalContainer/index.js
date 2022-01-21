import React from "react";
import styles from "./style.module.scss";

// import clsx from "clsx";
import { Modal } from "@mui/material";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as actionModal from "../../actions/modal";
// import { useNavigate } from "react-router-dom";
function ModalConainer(props) {
  const { modal, modalCreators } = props;
  const { component, isModal } = modal;
  const hideModalCreator = () => {
    const { hideModal } = modalCreators;
    hideModal();
  };

  return (
    <Modal
      open={isModal}
      onClose={hideModalCreator}
      className={styles.modal_post}
    >
      <div>{component}</div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});
const mapDispatchToProps = (dispatch) => ({
  modalCreators: bindActionCreators(actionModal, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(widthConnect)(ModalConainer);
