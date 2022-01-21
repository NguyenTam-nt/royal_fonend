import React from "react";
import styles from "./style.module.scss";
// import clsx from "clsx";

function CreateRoom(props) {
  return (
    <div className={styles.create_room}>
      <div className={styles.create_room_box}>
        <button className="btn btn-primary" onClick={props.showSearchUser}>
          Search Room
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
