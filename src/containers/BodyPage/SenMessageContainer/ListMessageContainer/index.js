import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../../../actions/user";
import * as actionMesssage from "../../../../actions/message";
import ListMessage from "../../../../component/BodyPage/SenMesssage/LisMessage";
import InputMessage from "../../../../component/BodyPage/SenMesssage/InputMessage";
import { useParams, useNavigate } from "react-router-dom";

function ListMessageContainer(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const { message, messageCreators, user } = props;
  const { currenRoom, messages } = message;
  const { currenUser } = user;

  useEffect(() => {
    if (!currenRoom) {
      navigate("/send-message/create");
    } else {
      const message = messages.find((ms) => {
        return ms.idroom === slug;
      });
      if (!message) {
        const { getMessage } = messageCreators;
        getMessage(slug);
      }
    }
  }, [currenRoom, slug, messageCreators, messages, navigate]);

  const sendMessage = (message) => {
    const idroom = slug;
    const iduser = currenUser._id;
    const { addMessage } = messageCreators;
    addMessage({ idroom, iduser, message });
  };

  return (
    <>
      <ListMessage
        currentRoom={currenRoom}
        currenUser={currenUser}
        messages={messages}
      />
      <InputMessage sendMessage={sendMessage} />
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  message: state.message,
});
const mapDispatchToProps = (dispatch) => ({
  messageCreators: bindActionCreators(actionMesssage, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(ListMessageContainer);
