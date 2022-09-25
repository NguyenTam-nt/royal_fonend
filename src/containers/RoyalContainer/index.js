import React from "react";
import LoginContainer from "../LoginConainer";
import HomePage from "../HomePage";
import { connect } from "react-redux";

function RoyalConainer(props) {
  const { user } = props;
  const { isLogin } = user;

  return <div>{isLogin ? <HomePage /> : <LoginContainer />}</div>;
}
const mapStateToProps = (state) => ({
  animation: state.animation,
  user: state.user,
});

const widthConnect = connect(mapStateToProps, null);

export default widthConnect(RoyalConainer);
