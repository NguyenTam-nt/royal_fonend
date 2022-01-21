import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";

function Custombtn(props) {
  const { onClose, onSubmit, isSubmit } = props;

  return (
    <div className={styles.subtext_body_btn}>
      <button
        className={clsx(
          styles.subtext_body_btn_item,
          styles.subtext_body_btn_cancer
        )}
        onClick={onClose}
      >
        Cancer
      </button>
      <button
        className={clsx(
          styles.subtext_body_btn_item,
          { [styles.subtext_body_btn_error]: !isSubmit },
          { [styles.subtext_body_btn_success]: isSubmit }
        )}
        onClick={onSubmit}
      >
        Save
      </button>
    </div>
  );
}

export default Custombtn;
