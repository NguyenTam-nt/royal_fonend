import React, { useState } from "react";
import styles from "./style.module.scss";
import Custombtn from "../Custombtn";

function SubText(props) {
  const { about } = props;
  const [subText, setSubText] = useState(about && about.subtext);
  const [isSave, setIsSave] = useState(false);

  const handleChangeSubText = (e) => {
    if (e.target.value !== "") {
      if (e.target.value === about.subtext) {
        setIsSave(false);
      } else {
        setIsSave(true);
      }
    } else {
      setIsSave(false);
    }
    setSubText(e.target.value);
  };

  const saveSubText = () => {
    if (isSave && subText !== "") {
      props.submitSubText(subText);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.subtext_header}>
        <textarea rows={4} value={subText} onChange={handleChangeSubText} />
      </div>
      <div className={styles.subtext_body}>
        <span>80 characters remaining</span>
        <Custombtn
          isSubmit={isSave}
          onSubmit={saveSubText}
          onClose={props.hideSubText}
        />
      </div>
    </div>
  );
}

export default SubText;
