import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { API } from "../../../../contains/api";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import useClickOutNer from "../../../../Commons/useClickOutNer";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

function ItemFriend(props) {
  const { us, currenUser, userSelectLink } = props;
  const { isShow, setShow, ref } = useClickOutNer(false);
  return (
    <div className={styles.body_friends_item}>
      <Link to={`/name/${us.username}`}>
        <img
          src={`${API}/image/royal?image=${us.thumbnail}`}
          alt={`friend ${us.username}`}
        />
        <span>{us.username}</span>
      </Link>
      {currenUser._id === userSelectLink._id ? (
        <IconButton
          className={styles.friend_icon_btn}
          onClick={() => setShow(true)}
        >
          <MoreHorizIcon />
          {isShow ? (
            <div className={styles.dialog_handle_friend} ref={ref}>
              <div
                className={styles.dialog_item}
                onClick={() => props.confirmUnfriend(us?._id, us.username)}
              >
                <PersonRemoveOutlinedIcon /> <span>Unfriend</span>
              </div>
              <div className={styles.dialog_item}>
                <ManageAccountsOutlinedIcon /> <span>Edit friend list</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </IconButton>
      ) : (
        ""
      )}
    </div>
  );
}

export default ItemFriend;
