import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";
import { Icon } from '@iconify/react';
import ListMenuButton from "../../components/ListMenuButton/ListMenuButton";
import AddList from "../../components/AddList/AddList";
import axios from "axios";
import {useMountTransition} from "../../hooks/useMountTransition";
import { useFetch } from "../../hooks/useFetch";
import ActiveListMenu from "../../components/ActiveListMenu/ActiveListMenu";
import { FetchContext } from "../../Context/FetchContext";
import { useGetCurrentList } from "../../hooks/useGetCurrentList";


const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);
  const {fetchIteration} = useContext(FetchContext);

  const [searchInput, setSearchInput] = useState("");
  const [clickedList, setClickedList] = useState(null);


  const {data: lists, err: listsError, loading: listsLoading} = useFetch(`http://localhost:5000/${value}/lists`, fetchIteration);
  const currentList = useGetCurrentList(lists, clickedList);

  // for AddList component
  const [addListIsMounted, setAddListIsMounted] = useState(false);
  const addListHasTransitionedIn = useMountTransition(addListIsMounted, 500);

  useEffect(() => {
    if (!value) navigate("/login");

  }, [])
  

  return (
    <div className={styles.container}>
      {(addListHasTransitionedIn || addListIsMounted) && <AddList isMountedState={[addListIsMounted, setAddListIsMounted]} hasTransitionedIn={addListHasTransitionedIn} />}
      <div className={styles.navbar}>
        <h4 className={styles.logo}>MERN-REMINDERS</h4>
        <div className={styles.userButton}>
          <h4>User</h4>
          <Icon icon="gridicons:dropdown" />
        </div>
      </div>
      <div className={styles.listAndActiveListContainer}>
        <div className={styles.listsMenu}>
          <div className={styles.searchbar}>
            <Icon icon="bx:search-alt-2" inline={true} />
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
          <p className={styles.myLists}>My lists</p>
          <div className={styles.listsContainer}>
            {
            (lists && !listsLoading) 
              ? (lists.filter(list => list.name.toLowerCase().includes(searchInput.toLowerCase())).length)
                ? lists.filter(list => list.name.toLowerCase().includes(searchInput.toLowerCase())).map(list => 
                  <ListMenuButton 
                    id={list.id} 
                    key={list.id} 
                    list={list}
                    onClickCustomEvent={() => setClickedList(list)}
                  />)
                : (searchInput === "")? "You don't have any lists yet" :"No matches found"
              : "Loading..."
            }
          </div>
        </div>
        <ActiveListMenu currentList={currentList} resetClickedList={() => setClickedList(null)} isLoading={listsLoading}/>
      </div>
      <div className={styles.addListButton} onClick={() => setAddListIsMounted(true)}>
        <Icon icon="fluent:add-circle-24-filled" />
        Add list
      </div>
    </div>
  )
}

export default Main;