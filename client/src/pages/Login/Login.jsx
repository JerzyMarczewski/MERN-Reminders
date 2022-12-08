import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import styles from "./Login.module.css";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { value, setValue } = useContext(UserContext);

  useEffect(() => {
    if (value) navigate("/");
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username)
      return toast.error("Username is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    if (!password)
      return toast.error("Password is required", {
        position: toast.POSITION.TOP_RIGHT,
      });

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (!res.data.ok)
          return toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });

        setValue(username.toLowerCase());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Log in</h1>
        <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
          <div className={styles.field}>
            <Icon icon="mdi:user-circle" color="ffffff" width="32" />
            <input
              type="text"
              id="Username"
              name="Username"
              placeholder="Username"
              spellCheck={false}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Icon icon="mdi:password-alert" color="ffffff" width="32" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              spellCheck={false}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            <h2>Log in</h2>
          </button>
        </form>
        <p className={styles.bottomText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
