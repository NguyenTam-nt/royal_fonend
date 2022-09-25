import React from "react";
import styles from "./style.module.scss";
import * as actionAnimattion from "../../actions/animation";
import { connect } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
// import clsx from "clsx";

function Animation(props) {
  const { hideMessage } = props;
  const { isShowError, message } = props.animation;

  const { opacity, transform } = useSpring({
    opacity: isShowError ? 1 : 0,
    transform: `translateX(${isShowError ? 0 : 327}px)`,
    config: { mass: 5, tension: 350, friction: 80 },
  });

  const hideDiglog = () => {
    hideMessage();
  };

  return (
    <animated.div
      style={{ opacity, transform }}
      className={styles.logAnimation}
    >
      <div className={styles.dialogHeader}>
        <span>Error</span>
      </div>
      <div className={styles.dialogMessage}>
        <span>{message}</span>
      </div>
      <div className={styles.dialogIcon}>
        <IconButton onClick={hideDiglog} className={styles.IconButton}>
          <ClearIcon className={styles.IconClear} />
        </IconButton>
      </div>
    </animated.div>
  );
}

const mapStateToProps = (state) => ({
  animation: state.animation,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    showMessage: (message) =>
      dispatch(actionAnimattion.showErrorMessage(message)),
    hideMessage: () => dispatch(actionAnimattion.hideErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Animation);
