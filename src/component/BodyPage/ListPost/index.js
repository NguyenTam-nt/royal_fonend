import React from "react";
import styles from "./style.module.scss";

// import clsx from "clsx";

// App.propTypes = {

// };

function ListPost({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default ListPost;
