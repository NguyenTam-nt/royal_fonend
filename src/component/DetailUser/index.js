import React from "react";
import styles from "./style.module.scss";
import { FaCamera } from "react-icons/fa";
import CustomLink from "../CustomLink";
import clsx from "clsx";
import { API } from "../../contains/api";
import SubText from "./SubText";

function DetailUser(props) {
  const { about, currenUser, countFriend } = props;
  const [isEdit, setIsEdit] = React.useState(false);
  const hideSubText = () => setIsEdit(false);

  const submitSubText = (subText) => {
    props.submitSubText(subText);
    setIsEdit(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.header_detail}>
        <div className={styles.header_detail_img}>
          <img
            src={`${API}/image/royal?image=${about?.cover_photo}`}
            alt="profile"
          />
          <div className={styles.avatar_user}>
            <img
              src={`${API}/image/royal?image=${about && about.thumbnail}`}
              alt="avatar"
            />
            {currenUser._id === about._id ? (
              <div
                className={styles.avatar_user_icon_parrent}
                onClick={props.openPhoto}
              >
                <FaCamera className={styles.avatar_user_icon} />
              </div>
            ) : (
              ""
            )}
          </div>
          {currenUser._id === about._id ? (
            <div className={styles.avatar_user_cover} onClick={props.openPhoto}>
              <FaCamera className={styles.avatar_user_icon_cover} /> &nbsp; Edit
              Cover Photo
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.header_detail_text_name}>
          <h2>{about && about.username}</h2>
          {isEdit ? (
            <SubText
              hideSubText={hideSubText}
              submitSubText={submitSubText}
              about={about}
            />
          ) : (
            <pre>{about && about.subtext}</pre>
          )}
          {currenUser._id === about._id && !isEdit ? (
            <span
              className={styles.btn_edit}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </span>
          ) : (
            ""
          )}
        </div>
        <ul className={styles.nav_bar_header}>
          <CustomLink
            to=""
            classLink={styles.link_nav_bar_header}
            active={styles.item_nav_bar_header}
          >
            Posts
          </CustomLink>
          <CustomLink
            to="about"
            classLink={styles.link_nav_bar_header}
            active={styles.item_nav_bar_header}
          >
            About
          </CustomLink>
          <CustomLink
            to="friends"
            classLink={styles.link_nav_bar_header}
            active={styles.item_nav_bar_header}
          >
            Friends{" "}
            <span style={{ fontWeight: 400, fontSize: 16 }}>{countFriend}</span>
          </CustomLink>
          <CustomLink
            to="photos"
            classLink={styles.link_nav_bar_header}
            active={styles.item_nav_bar_header}
          >
            Photos
          </CustomLink>

          <li className={clsx(styles.nav_bar_header_more)}>More</li>
        </ul>
      </div>
    </div>
  );
}

export default DetailUser;
