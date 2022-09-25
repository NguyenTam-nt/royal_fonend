import React, { useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPost from "../../../actions/posts";
import * as actionUser from "../../../actions/user";
import * as actionModal from "../../../actions/modal";
import styles from "./style.module.scss";
import ImagePostUser from "../../../component/DetailUser/ImagePostUser";
function PhotosContainer(props) {
  const { postCreators, posts } = props;
  const { userSelectLink, listImage, listVideo } = posts;
  useEffect(() => {
    const { getImagesOfUser } = postCreators;
    getImagesOfUser(userSelectLink._id);
  }, [postCreators, userSelectLink]);

  return (
    <div className={styles.backgound}>
      <ImagePostUser listImage={listImage} listVideo={listVideo} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  postCreators: bindActionCreators(actionPost, dispatch),
  userCreators: bindActionCreators(actionUser, dispatch),
  modalCreators: bindActionCreators(actionModal, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(PhotosContainer);
