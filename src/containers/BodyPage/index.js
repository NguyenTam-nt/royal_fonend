import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../actions/posts";
import * as actionUser from "../../actions/user";
// import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ModalContainer from "../ModalContainer";

import styles from "./style.module.scss";
import clsx from "clsx";

function BodyPage(props) {
  return (
    <div className={clsx(styles.container)}>
      <ModalContainer />
      <Outlet />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(BodyPage);
