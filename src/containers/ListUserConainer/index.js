import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../actions/posts";
import * as actionUser from "../../actions/user";
import * as actionNotify from "../../actions/notify";
import * as actionModal from "../../actions/modal";
import ListUser from "../../component/ListUser";
import socket from "../ListenServerSoket";

function ListUserContainer(props) {
  const { user, notifyCreators, modalCreators } = props;
  const { currenUser } = user;
  const [listUser, setList] = useState([]);

  useEffect(() => {
    socket.on(currenUser._id + "_getuser", (data) => {
      setList(data.data);
    });
  }, [currenUser]);

  const sendNotify = ({ inComming }) => {
    const { sendNotifyAddFriend } = notifyCreators;
    const { hideModal } = modalCreators;
    sendNotifyAddFriend({ outGoing: currenUser._id, inComing: inComming });
    hideModal();
  };

  return <ListUser listUser={listUser} sendNotify={sendNotify} />;
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  notifyCreators: bindActionCreators(actionNotify, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(ListUserContainer);
