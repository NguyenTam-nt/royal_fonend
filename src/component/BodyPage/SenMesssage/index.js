import React from "react";
import styles from "./style.module.scss";
import RoomMessage from "./RoomMessage";
import Loading from "../../../containers/Loading";
function SenMessage({
  children,
  rooms,
  showRooms,
  currenRoom,
  currenUser,
  isLoading,
}) {
  return (
    <div className={styles.background}>
      <div className={styles.send__message_left}>
        <div className={styles.send__message_header}>
          <span>{currenUser.username}</span>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <RoomMessage
            rooms={rooms}
            showRooms={showRooms}
            currenRoom={currenRoom}
            currenUser={currenUser}
          />
        )}
      </div>
      <div className={styles.send__message_right}>{children}</div>
    </div>
  );
}

export default SenMessage;
