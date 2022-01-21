import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../../actions/user";
import * as actionMessage from "../../../actions/message";
import * as actionAnimation from "../../../actions/animation";
import { Outlet } from "react-router-dom";
import SenMessage from "../../../component/BodyPage/SenMesssage";
import { useNavigate } from "react-router-dom";
import socket from "../../ListenServerSoket";

function SenMessageContainer(props) {
  const { mesages, messageCreator, user, animation, animationCreator } = props;
  const { rooms, currenRoom } = mesages;
  const { currenUser } = user;
  const { isLoading } = animation;
  const navigate = useNavigate();
  useEffect(() => {
    const { showLoading, hideLoading } = animationCreator;
    if (!rooms[0]) {
      const { getRoom } = messageCreator;
      getRoom(currenUser._id);
      showLoading();
      return;
    }
    hideLoading();
  }, [messageCreator, currenUser, rooms, animationCreator]);

  const showRooms = (room) => {
    const { showRoomSuccess } = messageCreator;
    showRoomSuccess(room);
    navigate(`room/${room._id}`);
  };

  useEffect(() => {
    if (rooms) {
      rooms.forEach((room) => {
        socket.on(`${room._id}_sendMessage`, (data) => {
          if (data.iduser !== currenUser._id) {
            const { addMessageSuccess } = messageCreator;
            addMessageSuccess(data);
          }
        });
      });
    }
  }, [rooms, currenUser, messageCreator]);

  return (
    <SenMessage
      rooms={rooms}
      showRooms={showRooms}
      currenRoom={currenRoom}
      currenUser={currenUser}
      isLoading={isLoading}
    >
      <Outlet />
    </SenMessage>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  mesages: state.message,
  animation: state.animation,
});
const mapDispatchToProps = (dispatch) => ({
  userCreators: bindActionCreators(actionUser, dispatch),
  messageCreator: bindActionCreators(actionMessage, dispatch),
  animationCreator: bindActionCreators(actionAnimation, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(SenMessageContainer);
