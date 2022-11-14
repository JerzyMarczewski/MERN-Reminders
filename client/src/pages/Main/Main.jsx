import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";
import { Icon } from '@iconify/react';
import ListMenuButton from "../../components/ListMenuButton/ListMenuButton";
import AddList from "../../components/AddList/AddList";
import axios from "axios";
import useMountTransition from "../../hooks/useMountTransition";


const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);
  const [lists, setLists] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // for AddList component
  const [isMounted, setIsMounted] = useState(false);
  const hasTransitionedIn = useMountTransition(isMounted, 500);

  useEffect(() => {
    if (!value) navigate("/login");

    axios.get(`http://localhost:5000/${value}/lists`)
      .then(res => setLists(res.data))
  }, [])
  

  return (
    <div className={styles.container}>
      {(hasTransitionedIn || isMounted) && <AddList mounted={[isMounted, setIsMounted]} hasTransitionedIn={hasTransitionedIn} />}
      <div className={styles.navbar}>
        <h4 className={styles.logo}>MERN-REMINDERS</h4>
        <Icon icon="mi:options-horizontal" inline={true} width="30" />
      </div>
      <div className={styles.searchbar}>
        <Icon icon="bx:search-alt-2" inline={true} />
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div className={styles.listsMenu}>
        <p className={styles.myLists}>My lists</p>
        <div className={styles.listsContainer}>
          {
          (lists) 
            ? (lists.filter(list => list.name.toLowerCase().includes(searchInput.toLowerCase())).length)
              ? lists.filter(list => list.name.toLowerCase().includes(searchInput.toLowerCase())).map(list => <ListMenuButton list={list} key={list.id} id={list.id}/>)
              : "no matches found"
            : "loading..."
          }
        </div>
      </div>
      <div className={styles.addListButton} onClick={() => setIsMounted(true)}>add list</div>
    </div>
  )
}

export default Main;