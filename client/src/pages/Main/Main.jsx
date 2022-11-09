import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";
import { Icon } from '@iconify/react';
import ListMenuButton from "../../components/ListMenuButton/ListMenuButton";

// sample list
let lists = [
  {
    name: "list 1",
    color: "04A5AA",
    items: [
        {
            name: "item 1",
            date: null,
            done: false
        },
        {
            name: "item 2",
            date: null,
            done: false
        },
        {
          name: "item 3",
          date: null,
          done: true
      }
    ]
  },
  {
    name: "list 2",
    color: "DB162F",
    items: [
        {
            name: "item 1",
            date: null,
            done: false
        }
    ]
  },
  {
    name: "list 3",
    color: "DFD630",
    items: []
  },
  {
    name: "list 4",
    color: "09588E",
    items: []
  }
]

const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    if (!value) navigate("/login");
  }, [])
  

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h4 className={styles.logo}>MERN-REMINDERS</h4>
        <Icon icon="mi:options-horizontal" inline={true} />
      </div>
      <div className={styles.searchbar}>
        <Icon icon="bx:search-alt-2" inline={true} />
        <div>Search</div>
      </div>
      <div className={styles.listsMenu}>
        <p className={styles.myLists}>My lists</p>
        <div className={styles.listsContainer}>
          {lists.map(list => <ListMenuButton list={list}/>)}
        </div>
      </div>
      <div className={styles.addListButton}>add list</div>
    </div>
  )
}

export default Main;