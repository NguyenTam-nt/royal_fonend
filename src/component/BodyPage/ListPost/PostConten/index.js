import React from "react";
import styles from "./style.module.scss";
import { API } from "../../../../contains/api";

import clsx from "clsx";
function PostContent(props) {
  const { post, showAll } = props;
  const refPost = React.useRef();
  React.useEffect(() => {
    let refFace = refPost.current;
    if (!showAll) {
      window.addEventListener("scroll", () => {
        if (refFace) {
          if (refFace.getBoundingClientRect().bottom <= 0) {
            refFace.pause();
          } else if (
            refFace.getBoundingClientRect().top - 140 <= 0 &&
            refFace.ended === false
          ) {
            refFace.play();
          } else {
            refFace.pause();
          }
        }
      });
    }
    return () =>
      window.removeEventListener("scroll", () => {
        refFace.pause();
      });
  }, [showAll]);

  const dowmBottom = async () => {
    if (refPost) {
      await window.scrollBy(
        0,
        +(
          refPost.current.scrollHeight +
          refPost.current.getBoundingClientRect().top +
          500
        )
      );
    }
  };

  return (
    <div className={clsx({ [styles.PostContent]: showAll })}>
      {post?.image !== "" ? (
        <img
          className={styles.background__img}
          src={`${API}/image/royal?image=${post?.image}`}
          alt="post"
        />
      ) : (
        <video
          className={clsx(styles.background__img, "royal_video")}
          controls
          muted={true}
          ref={refPost}
          autoPlay={true}
          onEnded={dowmBottom}
        >
          <source src={`${API}/image/royal-video?video=${post?.video}`} />
        </video>
      )}
    </div>
  );
}

export default PostContent;
