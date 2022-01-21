import React, { useEffect } from "react";
import styles from "./style.module.scss";
// import { API } from "../../../../contains/api";
import { IconButton } from "@mui/material";
import Time from "react-time-format";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function HeartLike(props) {
  const { post, user } = props;

  const [isLike, setLike] = React.useState(false);
  const [userLike, setUserLike] = React.useState("");

  useEffect(() => {
    if (post?.liked) {
      let check = post.liked.some((like) => {
        return like === user._id;
      });

      if (check === true) {
        setLike(true);
        setUserLike(
          "You " +
            (post.liked.length - 1 > 0
              ? "and " + (post.liked.length - 1) + " others"
              : "")
        );
      } else {
        setUserLike(
          post.liked.length > 0 ? +post.liked.length + " people" : ""
        );
        setLike(false);
      }
    }
  });

  return (
    <>
      <div className={styles.post_liked}>
        <IconButton
          className={styles.post_like_item}
          onClick={() => props.likePost(post._id)}
        >
          {isLike ? (
            <FavoriteIcon className={styles.post_liked_iem} />
          ) : (
            <FavoriteBorderIcon className={styles.post_unlike_iem} />
          )}
        </IconButton>
        <span className={styles.post_like_count}>{userLike}</span>
        <span className={styles.post_time}>
          <Time value={post?.create_at} format="YYYY-MM-DD hh:mm:ss" />
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #ccc",
          paddingBottom: 12,
        }}
      >
        <span className={styles.story_post}>
          {post?.content !== "" ? "Story..." : ""}
        </span>

        <pre className={styles?.story_content}>
          {" "}
          {post?.content ? post.content : ""}
        </pre>
      </div>
    </>
  );
}

export default HeartLike;
