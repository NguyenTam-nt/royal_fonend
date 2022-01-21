import React from "react";
import styles from "./style.module.scss";
import ItemFriend from "./ItemFriend";

function FriendPage(props) {
  const { listUser, currenUser, userSelectLink } = props;
  return (
    <div className={styles.background}>
      <div className={styles.header_friends}>
        <div>
          <h5>Friends</h5>
        </div>
      </div>
      <div className={styles.body_friends}>
        {listUser &&
          listUser?.map((us, index) => {
            return (
              <ItemFriend
                us={us}
                key={index}
                userSelectLink={userSelectLink}
                currenUser={currenUser}
                confirmUnfriend={props.confirmUnfriend}
              />
            );
          })}
      </div>
    </div>
  );
}

export default FriendPage;
