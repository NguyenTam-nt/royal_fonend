import React, { useState } from "react";
import styles from "./style.module.scss";
import { FaImages } from "react-icons/fa";
import clsx from "clsx";
import { useSpring, animated } from "@react-spring/web";
import { API } from "../../contains/api";

function UpdatePost(props) {
  const { user, post } = props;

  const [data, setData] = useState({
    image: post.image,
    video: post.video,
    isPublic: true,
    content: post.content,
    _id: post._id,
  });
  const [isPublic, setPublic] = useState(true);

  const [urlImg, seturlImg] = useState(
    () => post.image && `${API}/image/royal?image=${post.image}`
  );
  const [urlVideo, setVideo] = useState(
    () => post.video && `${API}/image/royal-video?video=${post.video}`
  );

  //tongo nut public
  const { backgroundColor, transform } = useSpring({
    backgroundColor: isPublic ? "#b0dfff" : "#f5f5f5",
    transform: `translateX(${isPublic ? "125%" : "0%"})`,
    config: { duration: 250 },
  });

  const onSubmit = () => {
    props.addPost(data);
  };

  const handlePublic = () => {
    setData({
      ...data,
      isPublic: !isPublic,
    });
    setPublic(!isPublic);
  };
  const handleIamgeForm = (e) => {
    const files = e.target.files[0];
    const path = URL.createObjectURL(files);

    if (files.type === "video/mp4") {
      setVideo(path);
      setData({
        ...data,
        video: files,
      });
    } else {
      seturlImg(path);
      setData({
        ...data,
        image: files,
      });
    }
  };

  return (
    <div className={styles.form_add__post}>
      <div className={styles.form_add_title}>
        <span className={styles.form_add_title_text}>Update Post</span>
      </div>
      <div className={styles.form_add__post_item}>
        <div className={styles.form_add__user}>
          <div className={clsx("royal_avarta_online")}>
            <img
              className={clsx("royal_avata_online_sm")}
              src={`${API}/image/royal?image=${user.thumbnail}`}
              alt="..."
            />
          </div>
          <span className={"royal_username"}>{user ? user.username : ""}</span>
        </div>
        <div className={styles.form_add__post_pri}>
          {(urlImg || urlVideo) && (
            <div className={styles.form_add_post_img_change}>
              {urlImg ? (
                <img
                  className={styles.form__img_change}
                  src={urlImg}
                  alt="changeImg"
                />
              ) : (
                <video className={styles.form__img_change} controls>
                  <source src={urlVideo} />
                </video>
              )}
            </div>
          )}
          <label htmlFor="img__video" className={styles.btn__show_post_img}>
            <FaImages className={styles.btn__show_post_img_iem} />
            <span className={styles.btn__show_post_img_text}>
              Update image or video
            </span>
            <input
              type="file"
              multiple
              id="img__video"
              name="post_img"
              hidden
              onChange={handleIamgeForm}
            />
          </label>

          <div className={styles.add_post_pri_content}>
            <textarea
              id="w3review"
              name="text"
              rows="6"
              cols="50"
              value={data.content}
              onChange={(e) =>
                setData({
                  ...data,
                  content: e.target.value,
                })
              }
              className={styles.add_post_pri_text_content}
              placeholder="Enter content...!"
            ></textarea>
          </div>
          <div className={styles.form_add_submit}>
            <div className={styles.form_add__post_public}>
              <animated.div
                className={styles.background_public}
                style={{ backgroundColor }}
              >
                <animated.div
                  className={styles.tongo_public}
                  style={{ transform }}
                  onClick={handlePublic}
                ></animated.div>
              </animated.div>
              <span className={styles.form_add__post_public_text}>
                Public this post to Your friend
              </span>
            </div>
            <div className={styles.form_add__post_submit}>
              <button className={styles.btn} onClick={onSubmit}>
                Up post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
