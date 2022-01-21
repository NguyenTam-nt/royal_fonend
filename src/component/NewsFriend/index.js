import React, { useState } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AvartaFriend from "./AvartaFriend";
import NewsSlider from "./NewsSlider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

function NewsFriend(props) {
  const [currentNews, setCurrentNew] = React.useState(0);
  const [istang, setang] = useState(true);

  const nextNews = () => {
    if (currentNews < 11) {
      let num = currentNews + 1;
      setCurrentNew(num);
      setang(true);
    }
  };
  const preNews = () => {
    if (currentNews > 0) {
      let num = currentNews - 1;
      setCurrentNew(num);
      setang(false);
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.news__item, styles.avarta_user)}>
        <img
          className={styles.news_item_img}
          src="https://image.winudf.com/v2/image1/Y29tLnZnLnRlZW1vX3NjcmVlbl8wXzE1NTU2Nzg2NjFfMDIy/screen-0.jpg?fakeurl=1&type=.jpg"
          alt="avarta"
        />
        <div className={styles.news_item_buttom}>
          <AddOutlinedIcon style={{ color: "#fff", fontSize: 24 }} />
        </div>
        <div className={styles.news__item_text}>
          <span className={styles.news__item_text_item}>Create news</span>
        </div>
      </div>
      <div className={styles.news_friend}>
        <AvartaFriend />
        <NewsSlider currentNews={currentNews} istang={istang} />
        {currentNews < 11 ? (
          <IconButton className={styles.news__next_slider} onClick={nextNews}>
            <ArrowForwardIosIcon />
          </IconButton>
        ) : (
          ""
        )}
        {currentNews > 0 ? (
          <IconButton className={styles.news__pre_slider} onClick={preNews}>
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NewsFriend;
