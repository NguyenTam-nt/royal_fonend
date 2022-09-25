import React, { memo } from "react";
import styles from "./style.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Custombtn from "../../Custombtn";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

function ItemAbout(props) {
  const { check, SubIcon, textAbout, isShow, type, isDialog, user } = props;

  const [value, setValue] = React.useState(check);
  const [isSave, setIsSave] = React.useState(false);
  const params = useParams();

  const handleValue = (e) => {
    if (e.target.value === "") {
      setIsSave(false);
    } else {
      setIsSave(true);
    }
    setValue(e.target.value);
  };

  const onSubmit = () => {
    if (isSave) {
      props.onSubmit(value);
      setIsSave(false);
    }
  };

  const onCloseForm = () => {
    props.onCloseForm();
    setIsSave(false);
  };
  const deleteAbout = () => {
    props.onSubmit("");
    setIsSave("");
    setIsSave(false);
  };

  return (
    <li className={styles.about_detai_item}>
      {isShow ? (
        <div className={styles.form_deail_about}>
          <input
            className={styles.form_control}
            name="phone"
            placeholder={textAbout}
            value={value}
            onChange={handleValue}
            type={type ? type : "text"}
          />
          <Custombtn
            isSubmit={isSave}
            onSubmit={onSubmit}
            onClose={onCloseForm}
          />
        </div>
      ) : (
        ""
      )}
      {check ? (
        <div className={styles.intro_about_item_detail}>
          <i>{SubIcon}</i> {textAbout}&nbsp;<span>{check}</span>
          <IconButton className={styles.about_icon} onClick={props.showDialog}>
            <MoreHorizIcon />
          </IconButton>
          {isDialog && !isShow && user.username === params._u ? (
            <div className={styles.dialog_handle_about}>
              <div
                className={styles.dialog_handle_about_item}
                onClick={props.ShowForm}
              >
                <i>
                  <ModeEditOutlineOutlinedIcon />
                </i>{" "}
                Edit {textAbout}
              </div>

              <div
                className={styles.dialog_handle_about_item}
                onClick={deleteAbout}
              >
                <i>
                  <FaTrashAlt />
                </i>{" "}
                Delete {textAbout}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : user?.username === params._u ? (
        <div className={styles.about_link_item}>
          <div onClick={props.ShowForm}>
            <span>
              <AddCircleOutlineIcon />
            </span>{" "}
            {textAbout}
          </div>
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default memo(ItemAbout);
