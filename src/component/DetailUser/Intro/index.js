import React from "react";
import styles from "./style.module.scss";
import { FaHouseUser, FaMapMarkerAlt } from "react-icons/fa";
import clsx from "clsx";

function Intro(props) {
  const { intro, currenUser } = props;
  // console.log(intro);
  return (
    <div className={styles.background}>
      <h5>Intro</h5>
      <ul className={styles.intro_about}>
        {intro.live_in && (
          <li className={styles.intro_about_tiem}>
            <i>
              <FaHouseUser />
            </i>{" "}
            Lives in &nbsp;<span>{intro.live_in}</span>
          </li>
        )}
        {intro.address && (
          <li className={styles.intro_about_item}>
            <i>
              <FaMapMarkerAlt />
            </i>{" "}
            From&nbsp;<span>{intro.address}</span>
          </li>
        )}
        {currenUser._id === intro._id ? (
          <>
            <li
              className={clsx(
                styles.intro_about_item,
                styles.intro_about_item_btn
              )}
            >
              Edit detail
            </li>

            <li
              className={clsx(
                styles.intro_about_item,
                styles.intro_about_item_btn
              )}
            >
              Add Hobbies
            </li>
            <li
              className={clsx(
                styles.intro_about_item,
                styles.intro_about_item_btn
              )}
            >
              Add Featured
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default Intro;
