// import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

function HandlePost(props) {
  const { post, user, slug } = props;

  return (
    <div className={styles.handle_post}>
      {post.userid === user._id ? (
        <>
          <div
            className={styles.handle_post_item}
            onClick={() => props.comfirmPost()}
          >
            <span>Delete</span>
          </div>
          <div
            className={styles.handle_post_item}
            onClick={props.showDialogUpdate}
          >
            <span>Update</span>
          </div>
        </>
      ) : (
        ""
      )}
      {!slug ? (
        <div className={styles.handle_post_item} onClick={props.closeModal}>
          <Link to={`/post/${post._id}`}>
            <span>Go to Posts</span>
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className={styles.handle_post_item}>
        <span>Share</span>
      </div>
      <div className={styles.handle_post_item}>
        <span>Report</span>
      </div>
      <div className={styles.handle_post_item} onClick={props.closeModal}>
        <span>Cancel</span>
      </div>
    </div>
  );
}

export default HandlePost;
