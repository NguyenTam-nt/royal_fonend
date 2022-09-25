import React from "react";
import { API } from "../../../../contains/api";
import styles from "./style.module.scss";
import clsx from "clsx";

// };

function RoomMessage({ rooms, showRooms, currenRoom, currenUser }) {
  const showRoom = () => {
    var xhtml = null;
    if (rooms) {
      xhtml = rooms.map((ro, index) => {
        return (
          <div
            className={clsx(styles.send__message_body_item, {
              [styles.active]: currenRoom && currenRoom._id === ro._id,
            })}
            onClick={() => showRooms(ro)}
            key={index}
          >
            <img
              className={styles.send__message_body_item_img}
              src={`${API}/image/royal?image=${ro.user.thumbnail}`}
              alt="user commented"
            />
            <div className={styles.send__message_body_item_user}>
              <span>{ro.user.username}</span>

              {ro.mess ? (
                <span>
                  {ro.mess.iduser === currenUser._id
                    ? "bạn: "
                    : ro.user.username + ": "}
                  {ro.mess.message !== ""
                    ? ro.mess.message
                    : ro.mess.image
                    ? "đã gửi 1 ảnh"
                    : "đã gửi 1 video"}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      });
    }
    return xhtml;
  };
  return <div className={styles.send__message_body}>{showRoom()}</div>;
}

export default RoomMessage;
