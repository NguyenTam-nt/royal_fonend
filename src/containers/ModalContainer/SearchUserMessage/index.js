// import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";
import * as actionUser from "../../../actions/user";
import * as actionModal from "../../../actions/modal";
import * as actionMessage from "../../../actions/message";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { API } from "../../../contains/api";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function SearchUserContainer(props) {
  const [userSelect, setUserSelect] = React.useState(null);
  const [acceptNext, setNext] = React.useState(false);
  const {
    actionModalCreator,
    userCreator,
    user,
    messages,
    actionMessageCreator,
  } = props;
  const { listUserSearch } = user;
  const { rooms } = messages;
  const navigate = useNavigate();

  //show room or create room
  const showRooms = () => {
    if (acceptNext) {
      let room = rooms.find((ro) => {
        return ro.iduser1 === userSelect._id || ro.iduser2 === userSelect._id;
      });

      const { showRoomSuccess, showRoom } = actionMessageCreator;
      if (room) {
        showRoomSuccess(room);
        navigate(`/send-message/room/${room._id}`);
        hideModalSearch();
      } else {
        showRoom(userSelect._id);
        hideModalSearch();
      }
    }
  };

  const showSelectUser = (user) => {
    setUserSelect(user);
    setNext(true);
  };

  const showListUser = () => {
    let xhtml = null;
    if (listUserSearch[0]) {
      xhtml = listUserSearch.map((us, index) => {
        return (
          <div
            className={styles.search_user_message_list_user_item}
            key={index}
            onClick={() => showSelectUser(us)}
          >
            <img
              className={styles.search_user_message_list_user_item_img}
              src={`${API}/image/royal?image=${us.thumbnail}`}
              alt="vuive"
            />
            <span>{us.username}</span>
          </div>
        );
      });
    }
    return xhtml;
  };

  const hideModalSearch = () => {
    const { hideModal } = actionModalCreator;
    hideModal();
  };

  const searchUserToSend = (e) => {
    const { clearUserSearch, searchUser } = userCreator;
    const value = e.target.value;
    clearUserSearch(); // setKeyWord(value);
    if (value.trim() !== "") {
      searchUser(value);
    } else {
      clearUserSearch();
    }
  };

  const deleteUserSelect = () => {
    setUserSelect(null);
    setNext(false);
  };

  return (
    <div className={styles.search_user_message}>
      <div className={styles.search_user_message_header}>
        <IconButton
          onClick={hideModalSearch}
          className={styles.search_user_message_header_icon}
        >
          <ClearIcon />
        </IconButton>
        <h4>New message</h4>
        <span
          className={clsx({ [styles.next_search]: acceptNext })}
          onClick={showRooms}
        >
          Tiếp
        </span>
      </div>
      <div className={styles.search_user_message_serach}>
        <span>To: </span>
        <div className={styles.search_user_message_serach_group}>
          {userSelect ? (
            <div>
              <div className={styles.search_user_message_serach_group_item}>
                <span>{userSelect.username}</span>
                <span onClick={deleteUserSelect}>
                  <ClearIcon />
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            placeholder="Search..."
            // value={keyword}
            onChange={searchUserToSend}
            className={styles.search_user_message_input}
          />
        </div>
      </div>

      <div className={styles.search_user_message_list_user}>
        {showListUser()}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userCreator: bindActionCreators(actionUser, dispatch),
    actionModalCreator: bindActionCreators(actionModal, dispatch),
    actionMessageCreator: bindActionCreators(actionMessage, dispatch),
  };
};

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(SearchUserContainer);
