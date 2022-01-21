import React from "react";
import styles from "./style.module.scss";
import { API } from "../../../../contains/api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import clsx from "clsx";
import { IconButton } from "@mui/material";

function HeaderUser(props) {
  const { post } = props;

  return (
    <div className={clsx(styles.header_post)}>
      <div className={styles.header_user_post}>
        <img
          src={`${API}/image/royal?image=${post?.thumbnail}`}
          alt="user"
          className={styles.header_user_post_img}
        />
        <span className={styles.header_user_post_name}>{post?.username}</span>
        <IconButton
          className={styles.header_user_post_iconb}
          onClick={() => props.handlePost(post)}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default HeaderUser;
