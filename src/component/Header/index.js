import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FaComment, FaHome, FaCameraRetro, FaUserPlus } from "react-icons/fa";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";
import Notify from "../Notify";
import { API } from "../../contains/api";
import SubNav from "../SubNav";
import useClickOutNer from "../../Commons/useClickOutNer";

function Header(props) {
  const { user, notifys } = props;
  // const [search, setSearch] = useState("");
  const [showNotify, setShowNotifi] = React.useState(false);
  const { isShow, setShow, ref } = useClickOutNer(false);
  const handleNotify = () => {
    if (!showNotify) {
      props.getNotify();
    }
    setShowNotifi(!showNotify);
  };

  const searchPost = (e) => {
    props.serchPost(e.target.value);
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)} id="dropStart">
        {
          <>
            <ul className={styles.nav_header}>
              <li className={styles.li_active_link}>
                <Link to="/" className={clsx(styles.link_header)}>
                  ROYAL
                </Link>
              </li>
              <li
                className={clsx(
                  styles.link_header_icon,
                  styles.header_user_plus,
                  styles.link_header
                )}
              >
                <input
                  type="search"
                  onChange={searchPost}
                  placeholder="Search Post..."
                />
              </li>
              <li
                className={clsx(styles.link_header)}
                onClick={() => setShow(!isShow)}
              >
                <Avatar
                  alt="avarta"
                  style={{ marginRight: "12px" }}
                  src={`${API}/image/royal?image=${user.thumbnail}`}
                ></Avatar>
                <Typography
                  component="span"
                  fontSize="14px"
                  color="#fff"
                  fontWeight="600"
                >
                  {" "}
                  {user ? user.username : "Tài khoản"}
                </Typography>
                {isShow ? (
                  <div ref={ref}>
                    <SubNav handleLogOut={props.handleLogOut} user={user} />
                  </div>
                ) : (
                  ""
                )}
              </li>

              <CustomLink
                to="/"
                active={styles.active}
                className={styles.li_active_link}
                classLink={clsx(styles.link_header, styles.link_header_icon)}
              >
                <FaHome className={styles.bell_link} />
              </CustomLink>

              <li
                onClick={props.showModalUser}
                className={clsx(
                  styles.link_header_icon,
                  styles.header_user_plus,
                  styles.link_header
                )}
              >
                <FaUserPlus className={styles.bell_link} />
              </li>

              <li
                className={clsx(styles.link_header, styles.link_header_icon)}
                onClick={() => props.showModal()}
              >
                <FaCameraRetro className={styles.bell_link} />
              </li>

              <CustomLink
                to="/send-message/create"
                active={styles.active}
                className={styles.li_active_link}
                classLink={clsx(styles.link_header, styles.link_header_icon)}
              >
                <FaComment
                  className={styles.bell_link}
                  onClick={props.getRoommesage}
                />
              </CustomLink>

              <li
                className={clsx(styles.link_header, styles.link_header_icon)}
                onClick={handleNotify}
              >
                <NotificationsIcon className={styles.bell_link} />
                {showNotify ? <Notify notifys={notifys} /> : ""}
              </li>
              <div className={styles.activeLink_div}></div>
            </ul>
          </>
        }
      </div>
    </div>
  );
}

export default Header;
