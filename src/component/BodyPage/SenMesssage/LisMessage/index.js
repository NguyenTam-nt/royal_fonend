import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { API } from "../../../../contains/api";

function ListMessage(props) {
  const [listMessage, setList] = useState();
  const { currentRoom, messages, currenUser } = props;
  const refBox = useRef();

  useEffect(() => {
    if (messages) {
      messages.forEach((ms) => {
        if (ms.idroom === currentRoom._id) {
          setList(ms.messages);
        }
      });
    }
  }, [messages, currentRoom]);

  useEffect(() => {
    if (refBox) {
      refBox.current.scrollBy(0, refBox.current.scrollHeight);
    }
  });

  const showMessage = () => {
    let xhtml = null;
    if (listMessage) {
      xhtml = listMessage.map((ms, index) => {
        const classes =
          currenUser._id === ms.iduser
            ? styles.send__message_body_massage_box_right
            : styles.send__message_body_massage_box_left;
        return (
          <div key={index} className={classes}>
            {ms.message !== "" ? (
              <div
                className={clsx(styles.send__message_body_massage_box_item)}
                key={index}
              >
                {ms.message}
              </div>
            ) : (
              ""
            )}

            {(ms.video || ms.image) && (
              <div
                className={clsx(styles.send__message_body_massage_box_item_img)}
              >
                {ms.image ? (
                  <img
                    src={`${API}/image/royal?image=${ms.image}`}
                    alt="img"
                    className={styles.message__img}
                  />
                ) : (
                  <video className={styles.message__video} controls>
                    <source
                      src={`${API}/image/royal-video?video=${ms.video}`}
                    />
                  </video>
                )}
              </div>
            )}
          </div>
        );
      });
    }

    return xhtml;
  };
  return (
    <>
      <div className={styles.send__message_header}>
        <div className={styles.send__message_header_item}>
          <div className={"royal_avarta_online"}>
            <img
              className={"royal_avata_online_sm"}
              src={`${API}/image/royal?image=${
                currentRoom && currentRoom.user.thumbnail
              }`}
              alt="user commented"
            />
          </div>{" "}
          <span>{currentRoom && currentRoom.user.username}</span>
        </div>
      </div>
      <div className={styles.send__message_body}>
        <div className={styles.send__message_body_massage}>
          <div className={styles.send__message_body_massage_box} ref={refBox}>
            <div className={styles.send__message_body_massage_box_children}>
              {showMessage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListMessage;
