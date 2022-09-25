import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { API } from "../../../contains/api";

function Friends(props) {
  const { listFriend } = props;
  return (
    <div className={styles.background}>
      <div className={styles.header_friends}>
        <div>
          <h5>Friends</h5>
          <span>{listFriend?.count} Friends</span>
        </div>
        <Link to="friends">See All Friends</Link>
      </div>
      <div className={styles.body_friends}>
        {listFriend.users &&
          listFriend?.users.map((us, index) => {
            return (
              <Link
                to={`/name/${us.username}`}
                className={styles.body_friends_item}
                key={index}
              >
                <img
                  src={`${API}/image/royal?image=${us.thumbnail}`}
                  alt={`friend ${us.username}`}
                />
                <span>{us.username}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Friends;
