import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styles from "./style.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import socket from "../ListenServerSoket";
import ItemPostContainer from "../BodyPage/ItemPostContainer";

function DetailPost(props) {
  const params = useParams();
  const [currentPost, setPost] = React.useState(null);
  const { posts, user } = props;
  const { listPosts, listPostOfCurrent } = posts;
  const { currenUser } = user;
  const navigate = useNavigate();

  //get post detail
  React.useEffect(() => {
    let po = listPosts.find((post) => {
      return post._id === params.slug;
    });
    setPost(po);
    if (!po) {
      po = listPostOfCurrent.find((post) => {
        return post._id === params.slug;
      });
      setPost(po);
    }
    return () => {
      setPost(null);
    };
  }, [listPosts, params.slug, navigate, listPostOfCurrent]);

  useEffect(() => {
    if (params.slug && !currentPost) {
      socket.emit("get_current_post", params.slug);
    }
  }, [params.slug, currentPost]);

  useEffect(() => {
    socket.on("get_post_success", (data) => {
      setPost(data);
    });
  }, [currentPost, params.slug]);

  return (
    <div className={styles.backgound}>
      <div className={styles.animation_background}></div>
      <div className={styles.backgound_image}>
        <div className={styles.arrow_goback} onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon style={{ fontSize: 44 }} />
        </div>
        <div className={styles.backgound_item}>
          {currentPost ? (
            <ItemPostContainer
              post={currentPost}
              user={currenUser}
              socket={socket}
              isDetail={true}
              showAll={true}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  // modalCreators: bindActionCreators(actionModal, dispatch),
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(widthConnect)(DetailPost);
