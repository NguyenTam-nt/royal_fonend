import React from "react";
// import { useSpring, animated } from "@react-spring/web";
import styles from "./style.module.scss";

import clsx from "clsx";
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

function NewsSlider(props) {
  const { currentNews, istang } = props;
  const showNews = () => {
    let xhml = null;
    xhml = itemData.map((news, index) => {
      let xhmlIem = null;

      if (currentNews === index) {
        const classSlider = istang
          ? styles.news__img_sliderToLeft
          : styles.news__img_sliderToRight;
        xhmlIem = (
          <div
            className={clsx(styles.news__img_slider, classSlider)}
            key={index}
          >
            <img src={news.img} alt="..." className={styles.img_item} />
          </div>
        );
      }
      return xhmlIem;
    });

    return xhml;
  };

  return <div className={styles.news__item_slider}>{showNews()}</div>;
}

export default NewsSlider;
