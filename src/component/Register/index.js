import React, { useState } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import image from "../../image/signin.png";
import { Link } from "react-router-dom";

function Register(props) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repassord: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    props.sendData(data);
  };

  return (
    <div className={styles.background}>
      <div className={styles.register_form}>
        <div
          className={styles.subResgister}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={clsx(styles.form_login)}>
          <div className={styles.logo_top}>Sign Up</div>
          <div className={styles.form} onSubmit={onSubmit}>
            <div
              className={clsx(styles.form_group)}
              style={{ textAlign: "center" }}
            >
              <p className={styles.form_sub_title}>
                ROYAL is a social networking app
              </p>
            </div>
            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_input)}>
                <input
                  type="text"
                  name="username"
                  className={clsx(styles.form_control)}
                  placeholder="User name"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_input)}>
                <input
                  type="email"
                  id="email"
                  className={clsx(styles.form_control)}
                  placeholder="E-mail"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  onBlur={(e) => props.comfirmEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_input)}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={clsx(styles.form_control)}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_input)}>
                <input
                  type="password"
                  name="repassword"
                  placeholder="Confirm password"
                  className={clsx(styles.form_control)}
                  onChange={(e) =>
                    setData({ ...data, repassord: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={clsx(styles.form_group)}>
              <input
                type="submit"
                value="Sign up"
                className={clsx(styles.form_submit)}
                onClick={onSubmit}
              />
              <Link to="/" className={clsx(styles.form_redirect)}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
