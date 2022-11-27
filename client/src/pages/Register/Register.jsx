import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import styles from "./Register.module.css";
import { Icon } from "@iconify/react";

// TODO: Change password input to text for production

const Register = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { value, setValue } = useContext(UserContext);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!username) return alert("username is required");
    if (!password1 || !password2) return alert("password fields are required");
    if (password1 !== password2) return alert("passwords must be the same");

    axios
      .post("http://localhost:5000/register", {
        username: username,
        password: password1,
      })
      .then((res) => {
        if (!res.data.ok) return alert(res.data.message);

        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h1>Register</h1>
        <form className={styles.registerForm} onSubmit={handleRegisterSubmit}>
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
              id="password1"
              name="password1"
              placeholder="Password"
              spellCheck={false}
              autoComplete="off"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Icon icon="mdi:password-alert" color="ffffff" width="32" />
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Password"
              spellCheck={false}
              autoComplete="off"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            <h2>Register</h2>
          </button>
        </form>
        <p className={styles.bottomText}>
          Alredy have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
