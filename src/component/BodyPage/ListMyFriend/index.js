import React from "react";
import styles from "./style.module.scss";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { IconButton } from "@mui/material";
import { API } from "../../../contains/api";
import { Link } from "react-router-dom";

// import clsx from "clsx";

// App.propTypes = {

// };

function ListMyFrient(props) {
  const { userFriend } = props;
  const ShowMyFriend = () => {
    let xhtml = userFriend.map((us, index) => {
      return (
        <Link
          to={`name/${us.username}`}
          className={styles.item_user_friend}
          key={index}
        >
          <img
            className={styles.item_user_friend_img}
            src={`${API}/image/royal?image=${us.thumbnail}`}
            alt="..."
          />{" "}
          <span className={styles.item_user_friend_name}>{us.username}</span>
          <span className={styles.item_user_friend_acive}></span>
        </Link>
      );
    });
    return xhtml;
  };
  return (
    <div className={styles.container}>
      <div className={styles.friend_title}>
        <span className={styles.friend_title_text}>My Friend</span>
        <IconButton className={styles.friend_title_icon}>
          <PersonSearchOutlinedIcon />
        </IconButton>
      </div>
      {ShowMyFriend()}
    </div>
  );
}

export default ListMyFrient;
