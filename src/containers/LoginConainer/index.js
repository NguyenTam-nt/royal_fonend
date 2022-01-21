import React, { useEffect } from "react";
// import styles from "./style.module.scss";
// import clsx from "clsx";
import Login from "../../component/Login";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionAnimation from "../../actions/animation";
import * as actionUser from "../../actions/user";

function LoginContainer(props) {
  const { userCreators, animationCreator, user, animation } = props;
  const { isShowError } = animation;
  const { isLogin } = user;
  useEffect(() => {
    let timeout;
    const { hideErrorMessage } = animationCreator;

    if (isShowError) {
      timeout = setTimeout(() => {
        hideErrorMessage();
      }, 7000);
    }
    return () => clearTimeout(timeout);
  }, [isShowError, animationCreator]);

  const loginUser = async (data) => {
    const { showErrorMessage } = animationCreator;
    const { loginUser } = await userCreators;
    if (data.email.trim() === "" || data.password.trim() === "") {
      if (!isShowError) {
        showErrorMessage("vui lòng nhập đầy dủ các trường");
      }
    } else {
      loginUser(data);
    }
  };

  return (
    <div>
      <Login loginUser={loginUser} isLogin={isLogin} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  animation: state.animation,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  userCreators: bindActionCreators(actionUser, dispatch),
  animationCreator: bindActionCreators(actionAnimation, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(LoginContainer);
