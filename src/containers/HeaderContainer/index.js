import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../actions/user";
import * as notifyAction from "../../actions/notify";
import * as actionModal from "../../actions/modal";
import * as actionPost from "../../actions/posts";
import * as messageAction from "../../actions/message";

import Header from "../../component/Header";
import AddPostModal from "../AddPostModal";
import socket from "../ListenServerSoket";
import ListUserConainer from "../ListUserConainer";

function HeaderContainer(props) {
  const {
    modalCreators,
    user,
    notifyCreator,
    notify,
    messageCreator,
    messages,
    userCreators,
    postCreator,
  } = props;
  const { currenUser } = user;
  const { notifys } = notify;
  const [show, setShow] = useState(false);
  //modal add posts
  const showModalCreator = () => {
    // const { showModal } = modalCreators;
    // showModal(<AddPostModal />);
    setShow(true);
  };

  //get notification
  const getNotify = () => {
    if (!notifys[0]) {
      const { getNotify } = notifyCreator;
      getNotify(currenUser._id);
    }
  };

  //listen soket notifi
  useEffect(() => {
    socket.on(`${currenUser._id}_getNotify`, (data) => {
      const { getNotifySuccess } = notifyCreator;
      getNotifySuccess(data);
    });
  }, [notifyCreator, currenUser]);

  //get users was chat
  const getRoommesage = () => {
    const { rooms } = messages;
    if (!rooms[0]) {
      const { getRoom } = messageCreator;
      getRoom(currenUser._id);
    }
  };

  //show and get users to add friend
  const showModalUser = () => {
    const { showModal } = modalCreators;
    const { getUserNoFriend } = userCreators;
    getUserNoFriend(currenUser._id);
    showModal(<ListUserConainer />);
  };

  //logout
  const handleLogOut = () => {
    const { refreshTokenFail } = userCreators;
    refreshTokenFail();
    socket.emit("log_out", { id: currenUser._id });
  };

  const onClose = () => {
    setShow(false);
  };
  //search post as keyword
  const serchPost = (value) => {
    const { searchPost } = postCreator;
    searchPost(value);
  };

  return (
    <div>
      <Header
        user={currenUser}
        showModal={showModalCreator}
        getNotify={getNotify}
        notifys={notify.notifys}
        showModalUser={showModalUser}
        getRoommesage={getRoommesage}
        handleLogOut={handleLogOut}
        serchPost={serchPost}
      />
      {show ? <AddPostModal onClose={onClose} /> : ""}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  notify: state.notify,
  messages: state.message,
  // modal: state.modal,
});
const mapDispatchToProps = (dispatch) => ({
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
  notifyCreator: bindActionCreators(notifyAction, dispatch),
  postCreator: bindActionCreators(actionPost, dispatch),
  messageCreator: bindActionCreators(messageAction, dispatch)
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(HeaderContainer);
