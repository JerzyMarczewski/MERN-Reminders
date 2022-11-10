import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Main.module.css";
import { Icon } from '@iconify/react';
import ListMenuButton from "../../components/ListMenuButton/ListMenuButton";
import axios from "axios";

// sample list
// let lists = [
//   {
//     id: "636a8b9bf6a0115ae935af9f",
//     name: "list 1",
//     color: "04A5AA",
//     items: [
//         {
//             name: "item 1",
//             date: null,
//             done: false
//         },
//         {
//             name: "item 2",
//             date: null,
//             done: false
//         },
//         {
//           name: "item 3",
//           date: null,
//           done: true
//       }
//     ]
//   },
//   {
//     id: "636a8b9bf6a0115ae935af9g",
//     name: "list 2",
//     color: "DB162F",
//     items: [
//         {
//             name: "item 1",
//             date: null,
//             done: false
//         }
//     ]
//   },
//   {
//     id: "636a8b9bf6a0115ae935af9h",
//     name: "list 3",
//     color: "DFD630",
//     items: []
//   },
//   {
//     id: "636a8b9bf6a0115ae935af9i",
//     name: "list 4",
//     color: "09588E",
//     items: []
//   }
// ]

const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    if (!value) navigate("/login");

    axios.get(`http://localhost:5000/${value}/lists`)
      .then(res => setLists(res.data))
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
          {
          (lists) 
            ? lists.map(list => <ListMenuButton list={list} key={list.id} id={list.id}/>)
            : "loading..."
          }
        </div>
      </div>
      <div className={styles.addListButton}>add list</div>
    </div>
  )
}

export default Main;