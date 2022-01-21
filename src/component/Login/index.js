import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import clsx from "clsx";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
function Login(props) {
  const { isLogin } = props;
  console.log(isLogin);
  const [showPass, setShowPass] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const backgoundLeft = useSpring({
    transform: `translateX(${isLogin ? -100 : 0}%)`,
    config: { duration: 2000 },
  });
  const backgroundRight = useSpring({
    transform: `translateX(${isLogin ? 100 : 0}%)`,
    config: { duration: 2000 },
  });
  useEffect(() => {
    if (isLogin) {
      hanleBackgound();
    }
  }, [isLogin]);

  const hanleBackgound = () => {
    const form_login = document.querySelector(`.${styles.form_login}`);
    const background = document.querySelector(`.${styles.background}`);

    form_login.style.opacity = "0";
    setTimeout(() => {
      background.style.display = "none";
    }, 2000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.loginUser(login);
  };

  return (
    <div className={styles.background}>
      <animated.div
        style={backgoundLeft}
        className={clsx(styles.background_login_left, styles.background_login)}
      />
      <animated.div
        style={backgroundRight}
        className={clsx(styles.background_login_right, styles.background_login)}
      />

      <div className={clsx(styles.form_login)}>
        <div className={styles.logo_top}>
          Welcome to<span className={styles.logo_text}> ROYAL</span>
        </div>
        <div className={styles.form} onSubmit={onSubmit}>
          <div className={clsx(styles.form_group)}>
            <span className={styles.form_sub_title}>
              Enter your account to experience ROYAL
            </span>
          </div>
          <div className={clsx(styles.form_group)}>
            <div className={clsx(styles.form_input)}>
              <input
                type="email"
                id="email"
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value,
                  })
                }
                className={clsx(styles.form_control)}
                placeholder="E-mail"
              />
              <IconButton className={styles.form_icon}>
                <MailOutlineOutlinedIcon />
              </IconButton>
            </div>
          </div>

          <div className={clsx(styles.form_group)}>
            <div className={clsx(styles.form_input)}>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value,
                  })
                }
                className={clsx(styles.form_control)}
              />
              <IconButton
                className={styles.form_icon}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </div>
          </div>
          <div className={styles.form_group_utti}>
            <div className={styles.form_remember}>
              <input type="checkbox" />{" "}
              <span className={styles.mg_l_8}> Remember me</span>
            </div>
            <div className={styles.form_remember}>
              <a href="/">Forgot password?</a>
            </div>
          </div>

          <div className={clsx(styles.form_group)}>
            <input
              type="submit"
              value="Sign in"
              className={clsx(styles.form_submit)}
              onClick={onSubmit}
            />
          </div>
          <div className={clsx(styles.form_group)}>
            <Link
              to="/sign-up/redirect"
              style={{ alignSelf: "center", fontWeight: 600 }}
            >
              Create a account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
