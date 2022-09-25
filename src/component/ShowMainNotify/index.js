import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { API } from "../../contains/api";

function ShowMainNotify(props) {
  const { notify } = props;

  return (
    <div className={styles.background}>
      <IconButton className={styles.notify_clear}>
        <ClearIcon />
      </IconButton>
      <div className={styles.notify_header}>
        <img
          className="royal_avata_online_sm"
          src={`${API}/image/royal?image=${notify?.thumbnail}`}
          alt="..."
        />
        <span>{notify && notify.username}</span>
      </div>
      <div className={styles.notify__content}>
        <span className={styles.notify__content_text}>{notify?.username} </span>
        {notify?.Content}
      </div>
      {notify?.Type === "ADD_FRIEND" ? (
        <div className={styles.notify__footer}>
          <button
            className={clsx("btn", "btn-primary")}
            onClick={() => props.acceptAddFriend(notify?._id)}
          >
            Kết bạn
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowMainNotify;
