import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../actions/posts";
import * as actionUser from "../../actions/user";
import * as actionNotify from "../../actions/notify";
import socket from "../ListenServerSoket";
import ShowMainNotify from "../../component/ShowMainNotify";
import styles from "./style.module.scss";

function ShowMainNotifyContainer(props) {
  const { user, notifyCreators, notify } = props;
  const { currenUser } = user;

  const { notifysAction } = notify;

  useEffect(() => {
    const { sendNotifyAddFriendSuccess, acceptAddFriendSuccess } =
      notifyCreators;
    socket.on(`${currenUser._id}_sendFriend`, (data) => {
      sendNotifyAddFriendSuccess(data);
    });

    socket.on(`${currenUser._id}_acceptFriend`, (data) => {
      acceptAddFriendSuccess(data);
    });
  }, [currenUser, notifyCreators]);

  const acceptAddFriends = (id) => {
    const { acceptAddFriend } = notifyCreators;
    acceptAddFriend(id);
  };

  useEffect(() => {
    const { getNotifyAddFriend } = notifyCreators;
    getNotifyAddFriend(currenUser._id);
  }, [notifyCreators, currenUser]);

  const ShowMainNotifys = () => {
    var xhtml = [];
    if (notifysAction[0]) {
      xhtml = notifysAction?.map((noti, index) => {
        return (
          <ShowMainNotify
            notify={noti}
            acceptAddFriend={acceptAddFriends}
            key={index}
          />
        );
      });
    }
    return xhtml;
  };

  return <div className={styles.notify_background}>{ShowMainNotifys()}</div>;
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
  notify: state.notify,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  notifyCreators: bindActionCreators(actionNotify, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(ShowMainNotifyContainer);
