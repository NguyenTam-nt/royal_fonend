import clsx from "clsx";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { API } from "../../contains/api";

// import clsx from "clsx";

function ListUser(props) {
  const { listUser } = props;
  const ShowUser = useMemo(() => {
    var html = null;
    html = listUser.map((user, index) => {
      return (
        <div className={styles.list_user_item} key={index}>
          <Link
            to={`name/${user.username}`}
            className={styles.list_user_item_link}
          >
            <div className={"royal_avarta_online"}>
              <img
                className={"royal_avata_online_sm"}
                src={`${API}/image/royal?image=${user.thumbnail}`}
                alt="user commented"
              />
            </div>
            <span>{user.username}</span>
          </Link>
          <button
            className={clsx("btn", "btn-primary", styles.btn_user)}
            onClick={() => props.sendNotify({ inComming: user._id })}
          >
            <PersonAddIcon className={styles.mr_8} /> Kết bạn
          </button>
        </div>
      );
    });

    return html;
  }, [listUser, props]);

  return (
    <div className={styles.form_lis_user}>
      <div className={styles.list_user_no_friend}>
        <h2 className={styles.list_user_item_title}>
          Những người bạn có thể biết
        </h2>
        {ShowUser}
      </div>
    </div>
  );
}

export default ListUser;
