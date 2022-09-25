import React, { useCallback } from "react";
import styles from "./style.module.scss";
import ItemAbout from "./ItemAbout";
import { FaHouseUser, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// import { Link } from "react-router-dom";
// import { API } from "../../../contains/api";

function About(props) {
  const { user, currenUser } = props;
  const [isSavePhone, setIsSavePhone] = React.useState({
    isShow: false,
    isDialog: false,
  });

  const [isSaveUserFrom, setIsSaveUserFrom] = React.useState({
    isShow: false,
    isDialog: false,
  });

  const [isSaveLiveIn, setIsLiveIn] = React.useState({
    isShow: false,
    isDialog: false,
  });

  const savePhone = useCallback(
    (value) => {
      props.savePhone(value);
    },
    [props]
  );

  const saveUserFrom = useCallback(
    (value) => {
      props.saveUserFrom(value);
    },
    [props]
  );

  const saveUserLive = useCallback(
    (value) => {
      props.saveUserLive(value);
    },
    [props]
  );

  const showDialogPhone = () => {
    setIsSavePhone({
      ...isSavePhone,
      isDialog: !isSavePhone.isDialog,
    });
    setIsSaveUserFrom({
      ...isSaveUserFrom,
      isDialog: false,
    });

    setIsLiveIn({
      ...isSaveLiveIn,
      isDialog: false,
    });
  };
  const showDialogFrom = () => {
    setIsSaveUserFrom({
      ...isSaveUserFrom,
      isDialog: !isSaveUserFrom.isDialog,
    });
    setIsSavePhone({
      ...isSavePhone,
      isDialog: false,
    });
    setIsLiveIn({
      ...isSaveLiveIn,
      isDialog: false,
    });
  };
  const showDialogLive = () => {
    setIsLiveIn({
      ...isSaveLiveIn,
      isDialog: !isSaveLiveIn.isDialog,
    });

    setIsSaveUserFrom({
      ...isSaveUserFrom,
      isDialog: false,
    });
    setIsSavePhone({
      ...isSavePhone,
      isDialog: false,
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.about_detai}>
        <ul className={styles.about_detai_list}>
          {/* //phone */}
          <ItemAbout
            isShow={isSavePhone.isShow}
            check={user.phone}
            onCloseForm={() =>
              setIsSavePhone({
                ...isSavePhone,
                isShow: false,
                isDialog: false,
              })
            }
            onSubmit={savePhone}
            SubIcon={<FaPhoneAlt />}
            textAbout="Phone"
            ShowForm={() => {
              setIsSavePhone({
                ...isSavePhone,
                isShow: true,
              });
            }}
            user={currenUser}
            isDialog={isSavePhone.isDialog}
            showDialog={showDialogPhone}
          />

          {/* User Form */}
          <ItemAbout
            isShow={isSaveUserFrom.isShow}
            check={user.address}
            onCloseForm={() =>
              setIsSaveUserFrom({
                ...isSaveUserFrom,
                isShow: false,
                isDialog: false,
              })
            }
            user={currenUser}
            onSubmit={saveUserFrom}
            SubIcon={<FaMapMarkerAlt />}
            textAbout="User From"
            ShowForm={() =>
              setIsSaveUserFrom({
                ...isSaveUserFrom,
                isShow: true,
              })
            }
            isDialog={isSaveUserFrom.isDialog}
            showDialog={showDialogFrom}
          />

          {/* Live In */}
          <ItemAbout
            isShow={isSaveLiveIn.isShow}
            check={user.live_in}
            onCloseForm={() =>
              setIsLiveIn({
                ...isSaveLiveIn,
                isShow: false,
                isDialog: false,
              })
            }
            user={currenUser}
            onSubmit={saveUserLive}
            SubIcon={<FaHouseUser />}
            textAbout="Live in"
            ShowForm={() =>
              setIsLiveIn({
                ...isSaveLiveIn,
                isShow: true,
              })
            }
            isDialog={isSaveLiveIn.isDialog}
            showDialog={showDialogLive}
          />
        </ul>
      </div>
    </div>
  );
}

export default About;
