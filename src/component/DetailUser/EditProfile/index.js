import React, { useState } from "react";
import styles from "./style.module.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { API } from "../../../contains/api";
import clsx from "clsx";

function EditProfile(props) {
  const { about } = props;
  const [profile, setProfile] = useState(
    `${API}/image/royal?image=${about.thumbnail}`
  );
  const [coverPhoto, setCoverPhoto] = useState(
    `${API}/image/royal?image=${about.cover_photo}`
  );

  const [profileData, setprofileData] = useState({});
  const [coverPhotoData, setCoverPhotoData] = useState({});
  const [isSave, setIsSave] = useState(false);

  const handleChangeProfile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setprofileData(file);
    const path = URL.createObjectURL(file);

    setProfile(path);
    setIsSave(true);
  };

  const handeChangePhoto = (e) => {
    const file = e.target.files[0];
    setCoverPhotoData(file);
    const path = URL.createObjectURL(file);
    setCoverPhoto(path);
    setIsSave(true);
  };

  const subMitProfile = () => {
    if (isSave) {
      props.sendProfile({ profile: profileData, coverPhoto: coverPhotoData });
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.header_edi_profile}>
        <h4>Update profile picture</h4>
        <IconButton
          className={styles.icon_btn_profile}
          onClick={props.hideModal}
        >
          <ClearIcon />
        </IconButton>
      </div>
      <div className={styles.body_edit_profile}>
        <div className={styles.body_edit_profile__profile}>
          <div>
            <h6>Profile Picture</h6>
            <img
              src={profile}
              className={styles.img_profile_item}
              alt="profile"
            />
          </div>
          <label htmlFor="profile" className={styles.label_profile}>
            + update profile
            <input
              type="file"
              id="profile"
              name="profile"
              hidden
              onChange={handleChangeProfile}
            />
          </label>
        </div>

        <div className={styles.body_edit_profile__profile}>
          <div>
            <h6>Cover Photo</h6>
            <img
              src={coverPhoto}
              className={styles.img_profile_item}
              alt="coverPhoto"
            />
          </div>

          <label htmlFor="cover_photo" className={styles.label_profile}>
            + update cover photo
            <input
              type="file"
              id="cover_photo"
              name="cover_photo"
              hidden
              onChange={handeChangePhoto}
            />
          </label>
        </div>
      </div>
      <div>
        <button
          className={clsx(styles.btn_save, {
            [styles.btn_save_error]: !isSave,
          })}
          onClick={subMitProfile}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
