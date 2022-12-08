import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";
import { Icon } from "@iconify/react";
import { useFetch } from "../../hooks/useFetch";
import ActiveListMenu from "../../components/ActiveListMenu/ActiveListMenu";
import { FetchContext } from "../../Context/FetchContext";
import { useGetCurrentList } from "../../hooks/useGetCurrentList";
import AllListsMenu from "../../components/AllListsMenu/AllListsMenu";
import UserDropdown from "../../components/UserDropdown/UserDropdown";
import axios from "axios";

const Main = (props) => {
  const navigate = useNavigate();

  const { value, setValue } = useContext(UserContext);
  const { fetchIteration } = useContext(FetchContext);

  const [clickedList, setClickedList] = useState(null);

  const {
    data: lists,
    err: listsError,
    loading: listsLoading,
  } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/${value}/lists`,
    fetchIteration
  );
  const currentList = useGetCurrentList(lists, clickedList);

  useEffect(() => {
    if (!value) navigate("/login");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h4 className={styles.logo}>MERN-REMINDERS</h4>
        <UserDropdown />
      </div>
      <div className={styles.listAndActiveListContainer}>
        <AllListsMenu
          lists={lists}
          isLoading={listsLoading}
          onListClick={(list) => setClickedList(list)}
        />
        <ActiveListMenu
          currentList={currentList}
          isLoading={listsLoading}
          resetClickedList={() => setClickedList(null)}
        />
      </div>
    </div>
  );
};

export default Main;
