import React from "react";
import styles from "./style.module.scss";
import * as actionAnimattion from "../../actions/animation";
import { connect } from "react-redux";
import { useSpring, animated } from "@react-spring/web";

// import clsx from "clsx";

function Loading(props) {
  const { isLoading } = props.animation;

  const { opacity, display } = useSpring({
    opacity: isLoading ? 1 : 0,
    display: isLoading ? "block" : "none",
    config: { mass: 5, tension: 350, friction: 80 },
  });

  return (
    <animated.div style={{ opacity, display }} className={styles.loading_comp}>
      <div className={styles.loading__group}>
        <div className={styles.loading__item} style={{ "--value": 1 }}></div>
        <div className={styles.loading__item} style={{ "--value": 2 }}></div>
        <div className={styles.loading__item} style={{ "--value": 3 }}></div>
        <div className={styles.loading__item} style={{ "--value": 4 }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
