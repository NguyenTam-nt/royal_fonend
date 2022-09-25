import { IconButton, Modal } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";
import ClearIcon from "@mui/icons-material/Clear";
import clsx from "clsx";
function ModalConfirm(props) {
  const { open, onClose, currenFriend } = props;
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <div className={styles.dialog_confirm}>
        <div className={styles.header_dialog}>
          <h4>Unfriend {currenFriend.username}</h4>
          <IconButton className={styles.header_dialog_btn} onClick={onClose}>
            <ClearIcon style={{ fontSize: 24 }} />
          </IconButton>
        </div>
        <div className={styles.dialog_body}>
          <span>
            Are you sure you want to remove {currenFriend.username} as your
            friend?
          </span>
        </div>
        <div className={styles.dialog_footer}>
          <button className={clsx(styles.dialog_body_btn)} onClick={onClose}>
            Cancel
          </button>
          <button
            className={clsx(
              styles.dialog_body_btn,
              styles.dialog_body_btn_primary
            )}
            onClick={() => props.unFriend(currenFriend.id)}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirm;
