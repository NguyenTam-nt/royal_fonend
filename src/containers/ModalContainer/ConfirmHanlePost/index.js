// import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";
import * as actionPost from "../../../actions/posts";
import * as actionModal from "../../../actions/modal";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ComfrimHandlePost(props) {
  const { actionPostCreator, actionModalCreator, post } = props;
  const navigate = useNavigate();
  const params = useParams();
  const hideModalComfirm = () => {
    const { hideModal } = actionModalCreator;
    hideModal();
  };

  const deletePost = () => {
    const { deletePost } = actionPostCreator;
    deletePost(post._id);
    hideModalComfirm();
    if (params.slug) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.handle_post}>
      <div className={styles.handle_post_item_header}>
        <span className={styles.handle_post_item_title}>Delete Post</span>
        <span className={styles.handle_post_item_text}>
          Are you sure you want to delete the post?
        </span>
      </div>

      <div className={styles.handle_post_item} onClick={deletePost}>
        <span>Delete</span>
      </div>
      <div className={styles.handle_post_item} onClick={hideModalComfirm}>
        <span>Cancel</span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionPostCreator: bindActionCreators(actionPost, dispatch),
    actionModalCreator: bindActionCreators(actionModal, dispatch),
  };
};

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(ComfrimHandlePost);
