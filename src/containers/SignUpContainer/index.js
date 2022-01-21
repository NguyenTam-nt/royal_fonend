import React, { useEffect } from "react";
import styles from "./style.module.scss";
// import clsx from "clsx";
import Register from "../../component/Register";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionUser from "../../actions/user";
import * as actionAnimation from "../../actions/animation";
import { useNavigate } from "react-router-dom";

function SignUpContainer(props) {
  const { userCreators, animationCreator, user, animation } = props;
  const { isSignUp } = user;
  const { isShowError } = animation;
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isSignUp) {
      navigate("/");
    }
  }, [isSignUp, navigate]);

  const sendData = async (data) => {
    const { showErrorMessage } = animationCreator;
    if (
      data.password === "" ||
      data.repassword === "" ||
      data.username === "" ||
      data.email === ""
    ) {
      !isShowError && showErrorMessage("Các trường không được để rỗng");
    } else if (data.password.length < 6) {
      !isShowError && showErrorMessage("Vui lòng nhập khẩu lớn hơn 5 ký tự");
    } else if (data.password !== data.repassord) {
      !isShowError && showErrorMessage("Vui lòng nhập đúng mật khẩu");
    } else {
      const { signUp } = await userCreators;
      signUp(data);
    }
  };

  const comfirmEmail = async (email) => {
    const { signUpEmail } = await userCreators;
    const { showErrorMessage, hideErrorMessage } = animationCreator;
    if (email.trim() !== "") {
      if (
        email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        signUpEmail(email);
      } else {
        showErrorMessage("Email không hợp lệ");
        setTimeout(() => {
          hideErrorMessage();
        }, 5000);
      }
    }
  };
  return (
    <div className={styles.background}>
      <Register sendData={sendData} comfirmEmail={comfirmEmail} />;
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

export default compose(widthConnect)(SignUpContainer);
