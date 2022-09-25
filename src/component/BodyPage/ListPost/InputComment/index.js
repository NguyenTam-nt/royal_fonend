import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import Picker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import useClickOutNer from "../../../../Commons/useClickOutNer";

function InputComment(props) {
  const { post, user } = props;
  let [messageComent, setComment] = React.useState("");
  const { isShow, setShow, ref } = useClickOutNer(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageComent !== "") {
      props.subMitComment({
        comment: messageComent,
        idpost: post._id,
        iduser: user._id,
      });
      setComment("");
    }
  };

  const onEmojiClick = (e, emojiObject) => {
    setComment((messageComent += emojiObject.emoji));
  };

  const handle_Emoji = () => setShow(!isShow);

  return (
    <div className={styles.input_commented}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form__input_comment}>
          <input
            className={styles.form_control}
            placeholder="Enter comment..."
            onChange={(e) => setComment(e.target.value)}
            value={messageComent}
          />
          <div onClick={handle_Emoji} className={styles.handle_emoji}>
            <FaSmile />
          </div>
          {isShow ? (
            <div className={styles.emoji_container} ref={ref}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            ""
          )}
          <span
            className={clsx(styles.btn__comment, {
              [styles.btn__comment_submit]: messageComent !== "",
            })}
            onClick={handleSubmit}
          >
            Comment
          </span>
        </div>
      </form>
    </div>
  );
}

export default InputComment;
