import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../../../actions/user";
import * as actionMessage from "../../../../actions/message";
import * as actionModal from "../../../../actions/modal";
import CreateRoom from "../../../../component/BodyPage/SenMesssage/CreateRoom";
import SearchUserMessage from "../../../ModalContainer/SearchUserMessage";
import { useNavigate } from "react-router-dom";
import socket from "../../../ListenServerSoket";

function CreateRoomContainer(props) {
  const { modalCreators, user, messageCreators } = props;
  const { currenUser } = user;
  const navigate = useNavigate();
  useEffect(() => {
    // yield put(actionMessage.createRoomSuccess(res.data.room));
    socket.on(`${currenUser._id}_createRoom`, (data) => {
      const { createRoomSuccess } = messageCreators;
      console.log(data);
      createRoomSuccess(data.room);
      navigate(`/send-message/room/${data.room._id}`);
    });
  }, [messageCreators, navigate, currenUser]);

  const showSearchUser = () => {
    const { showModal } = modalCreators;
    showModal(<SearchUserMessage />);
  };

  return <CreateRoom showSearchUser={showSearchUser} />;
}

const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.message,
});
const mapDispatchToProps = (dispatch) => ({
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
  messageCreators: bindActionCreators(actionMessage, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(CreateRoomContainer);
