import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { API } from "../../contains/api";

function Notify(props) {
  const { notifys } = props;

  const showNotify = () => {
    let xhmt = null;

    if (notifys[0]) {
      xhmt = notifys.map((noti, index) => {
        return (
          <div className={styles.notify_list_item} key={index}>
            <Link to="/" className={styles.notify_list_item_link}>
              <div className={styles.user_send_notify}>
                <img
                  src={`${API}/image/royal?image=${noti.thumbnail}`}
                  alt="..."
                  className={styles.notify_img}
                />{" "}
                <span className={styles.notify_list_item_name}>
                  {noti.username}
                </span>
              </div>
              <div className={styles.notify_list_item_name_text}>
                <span className={styles.notify_list_item_text_name}>
                  {noti.username + " "}
                </span>
                <span className={styles.notify_list_item_text}>
                  {noti.Content}
                </span>
              </div>
            </Link>
          </div>
        );
      });
    }

    return xhmt;
  };
  return (
    <div className={styles.notify_background}>
      <div className={styles.nitify_title}>
        <h5 className={styles.nitify_title_text}>Notify</h5>
      </div>
      <div className={styles.notify_list}>{showNotify()}</div>
    </div>
  );
}

export default Notify;
