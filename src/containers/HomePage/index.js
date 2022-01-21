import React from "react";
import styles from "./style.module.scss";
import HeaderContainer from "../HeaderContainer";
import BodyPage from "../BodyPage";
import { connect } from "react-redux";
import socket from "../ListenServerSoket";

function HomePage(props) {
  const { user } = props;
  const { currenUser } = user;
  const { isLogin } = user;

  React.useEffect(() => {
    if (isLogin && currenUser) {
      socket.emit("login_success", currenUser);
    }
  }, [isLogin, currenUser]);
  return (
    <div className={styles.home__Page}>
      <HeaderContainer />
      <div>
        <BodyPage />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  animation: state.animation,
  user: state.user,
});

const widthConnect = connect(mapStateToProps, null);

export default widthConnect(HomePage);
