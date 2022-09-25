import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { API } from "../../../contains/api";

function ImagePostUser(props) {
  const { listImage, listVideo } = props;

  const showImage = () => {
    let xhtml = null;
    if (listImage[0]) {
      xhtml = listImage.map((post, index) => {
        return (
          <div
            className={clsx("col-12", "col-sx-12", "col-md-3", "col-lg-3")}
            key={index}
          >
            {post.image !== "" ? (
              <Link to={`/post/${post._id}`} className={styles.image_post}>
                <img
                  className={styles.image_post_item}
                  src={`${API}/image/royal?image=${post.image}`}
                  alt="pic"
                />
              </Link>
            ) : (
              ""
            )}
          </div>
        );
      });
    }
    return xhtml;
  };

  const showVideos = () => {
    let xhtml = null;
    if (listImage[0]) {
      xhtml = listVideo.map((post, index) => {
        return (
          <div
            className={clsx("col-12", "col-sx-12", "col-md-3", "col-lg-3")}
            key={index}
          >
            {post.video !== "" ? (
              <Link to={`/post/${post._id}`} className={styles.image_post}>
                <video className={styles.video_post_item} controls>
                  <source src={`${API}/image/royal?image=${post.video}`} />
                </video>
              </Link>
            ) : (
              ""
            )}
          </div>
        );
      });
    }
    return xhtml;
  };

  return (
    <div className={styles.background}>
      <div className={styles.header_photo}>
        <h4>Photos</h4>
      </div>
      <div className="row">{showImage()}</div>

      <div className={styles.header_photo} style={{ marginTop: 100 }}>
        <h4>Videos</h4>
      </div>
      <div className="row">{showVideos()}</div>
    </div>
  );
}

export default ImagePostUser;
