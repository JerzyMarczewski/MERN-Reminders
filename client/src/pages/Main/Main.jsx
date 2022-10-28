import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";

const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    if (!value) navigate("/login");
  }, [])
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.hamburger}>Hamburger</div>
        <div>Profile</div>
        <Link to="/login" onClick={() => setValue("")}>Logout</Link>
      </div>
      <div className={styles.listsContainer}>
        <div className={styles.lists}>
          <p>a</p>
          <p>a</p>
          <p>a</p>
          <p>a</p>
        </div>
        {/* <div className={styles.listItems}>
          <li>do something</li>
          <li>do something</li>
          <li>do something</li>
        </div> */}
      </div>
    </div>
  )
}

export default Main;