import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { API } from "../../../../contains/api";
import Time from "react-time-format";

function Comment(props) {
  const { post, showAll } = props;

  const ShowComent = () => {
    let xhtml = null;
    if (post?.comments) {
      const cmt = showAll ? post.comments : post.comments.slice(0, 3);

      xhtml = cmt.map((comment, index) => {
        return (
          <div className={styles.list_commented__item} key={index}>
            <div>
              <div className={"royal_avarta_online"}>
                <img
                  className={"royal_avata_online_sm"}
                  src={`${API}/image/royal?image=${comment?.thumbnail}`}
                  alt="user commented"
                />
              </div>
            </div>
            <div className={styles.item_comment_content}>
              <span className={styles.comment_item_name}>
                {comment?.username}
              </span>
              <span className={styles.comment_item_conent}>
                {comment?.comment}
              </span>
              <span className={styles.date_comment}>
                <Time value={comment?.create_at} format="YYYY-MM-DD hh:mm:ss" />
              </span>
            </div>
          </div>
        );
      });
    }

    return xhtml;
  };
  return (
    <div className={styles.post_commented}>
      <span className={styles.story_post}>Comment</span>
      <div className={styles.list_commented}>
        {ShowComent()}
        <div>
          {!showAll ? (
            <Link to={`/post/${post._id}`}>
              <span className={styles.show_post_comment}>
                {post?.comments.length - 3 >= 0
                  ? "Xem " + post?.comments.length + " comment..."
                  : ""}
              </span>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
