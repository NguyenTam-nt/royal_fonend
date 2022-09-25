import React from "react";
import styles from "./style.module.scss";
// import { API } from "../../../../contains/api";
import clsx from "clsx";
import HeaderUser from "../HeaderUser";
import PostContent from "../PostConten";
import HeartLike from "../HeartLike";
import Comment from "../Comment";
import InputComment from "../InputComment";
// import PostContent from "../PostConten";
// App.propTypes = {

// };

function ItemPost(props) {
  const { post, user } = props;

  return (
    <div className={styles.container}>
      <div className={clsx("row")}>
        <div
          className={clsx(
            "col-12",
            "col-sm-12",
            "col-md-12",
            styles.background
          )}
        >
          <div className={clsx(styles.background__post)}>
            <HeaderUser post={post} user={user} handlePost={props.handlePost} />
            <PostContent post={post} />
            <div>
              <HeartLike post={post} likePost={props.likePost} user={user} />
              {/* commented */}
              {post.comment ? <Comment post={post} user={user} /> : ""}
              <InputComment
                post={post}
                user={user}
                subMitComment={props.subMitComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPost;
