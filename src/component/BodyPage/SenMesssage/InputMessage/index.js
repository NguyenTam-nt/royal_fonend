import React, { useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { FaPaperPlane, FaPhotoVideo, FaSmile } from "react-icons/fa";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Picker from "emoji-picker-react";
import useClickOutNer from "../../../../Commons/useClickOutNer";

function InputMessage(props) {
  const [message, setMessage] = React.useState({
    msg: "",
    file: null,
  });
  const [isPost, setPost] = React.useState(false);
  const [image, setImage] = React.useState();
  const [video, setVideo] = React.useState();
  const { isShow, setShow, ref } = useClickOutNer(false);
  const changeMessage = (e) => {
    if (e.target.value !== "") {
      setMessage({
        ...message,
        msg: e.target.value,
      });
      setPost(true);
    } else {
      setMessage({
        ...message,
        msg: e.target.value,
      });

      setPost(false);
    }
  };
  const subMitForm = (e) => {
    e.preventDefault();
    if (isPost) {
      props.sendMessage(message);
      setMessage({
        ...message,
        msg: "",
        file: null,
      });
      clearUrl();
    }
  };

  const clearUrl = () => {
    if (message.msg === "") {
      setPost(false);
    }
    image && URL.revokeObjectURL(image);
    video && URL.revokeObjectURL(video);
    setImage(null);
    setVideo(null);
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
      video && URL.revokeObjectURL(video);
    };
  }, [image, video]);

  const clearImage = () => {
    clearUrl();
    setMessage({
      ...message,
      file: null,
    });
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const path = URL.createObjectURL(file);
    file.type === "video/mp4" ? setVideo(path) : setImage(path);

    setMessage({
      ...message,
      file: file,
    });

    setPost(true);
  };

  const handleEmojiSelect = () => setShow(!isShow);

  const onEmojiClick = (e, emojiObject) => {
    setMessage({
      ...message,
      msg: (message.msg += emojiObject.emoji),
    });
  };

  return (
    <div className={styles.send__message_body_massage_input}>
      {(image || video) && (
        <div className={styles.list_img}>
          {image ? (
            <img src={image} alt="img" />
          ) : (
            <video controls>
              <source src={video} />
            </video>
          )}
          <div
            className={styles.send__message_body_massage_input}
            onClick={clearImage}
          >
            <ClearIcon style={{ fontSize: 14 }} />
          </div>
        </div>
      )}
      <form onSubmit={subMitForm}>
        <label htmlFor="photo" className={clsx(styles.form_control_send_photo)}>
          <input hidden type="file" id="photo" onChange={changeImage} />
          <FaPhotoVideo />
        </label>
        <input
          value={message.msg}
          className={styles.form_control}
          placeholder="Write message...."
          onChange={changeMessage}
        />
        <div className={styles.btn_emoij} onClick={handleEmojiSelect}>
          <FaSmile />
        </div>

        <IconButton
          className={clsx(styles.form_control_send, {
            [styles.form_control_send_fail]: !isPost,
          })}
          onClick={subMitForm}
        >
          <FaPaperPlane />
        </IconButton>
        {isShow && (
          <div className={styles.emoji_container} ref={ref}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </div>
  );
}

export default InputMessage;
