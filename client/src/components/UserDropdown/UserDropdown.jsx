import styles from "./UserDropdown.module.css";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);

  const [dropdownShown, setDropdownShown] = useState(false);

  const handleLogout = () => {
    setValue("");
    navigate("/login");
  };

  if (!dropdownShown)
    return (
      <div className={styles.options} onClick={() => setDropdownShown(true)}>
        <div className={styles.userButton}>
          <h5>{value}</h5>
          <Icon icon="gridicons:dropdown" />
        </div>
      </div>
    );

  return (
    <>
      <div className={styles.user}>
        <div className={styles.userButton}>
          <h5>{value}</h5>
          <Icon icon="gridicons:dropdown" />
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={handleLogout}>
            <div>Logout</div>
            <Icon icon="material-symbols:logout-rounded" />
          </div>
        </div>
        <div
          className={styles.background}
          onClick={() => setDropdownShown(false)}
        ></div>
      </div>
    </>
  );
};

export default UserDropdown;
