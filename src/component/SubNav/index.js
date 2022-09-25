import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaQuestion,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// import clsx from "clsx";

function SubNav(props) {
  const { user } = props;
  return (
    <div className={styles.background}>
      <div className={styles.sub_nav}>
        <div className={styles.sub_nav_item}>
          <Link
            to={`name/${user.username}`}
            className={styles.sub_nav_item_link}
          >
            <FaUserCircle className={styles.sub_nav_item_icon} /> See your
            profile
          </Link>
        </div>
        <div className={styles.sub_nav_item}>
          <FaComments className={styles.sub_nav_item_icon} /> Give feedback
        </div>
        <div className={styles.sub_nav_item}>
          <FaQuestion className={styles.sub_nav_item_icon} /> Help & Support
        </div>
        <div className={styles.sub_nav_item}>
          <FaCog className={styles.sub_nav_item_icon} /> Setting
        </div>
        <div className={styles.sub_nav_item} onClick={props.handleLogOut}>
          <FaSignOutAlt className={styles.sub_nav_item_icon} /> Log Out
        </div>
      </div>
    </div>
  );
}

export default SubNav;
