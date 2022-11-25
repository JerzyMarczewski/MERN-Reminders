import styles from "./AllListsMenu.module.css";
import { Icon } from "@iconify/react";
import ListMenuButton from "../ListMenuButton/ListMenuButton";
import { useState } from "react";
import { useMountTransition } from "../../hooks/useMountTransition";
import AddList from "../AddList/AddList";

const AllListsMenu = (props) => {
  const [searchInput, setSearchInput] = useState("");

  // for AddList component
  const [addListIsMounted, setAddListIsMounted] = useState(false);
  const addListHasTransitionedIn = useMountTransition(addListIsMounted, 500);

  return (
    <div className={styles.container}>
      {(addListHasTransitionedIn || addListIsMounted) && (
        <AddList
          isMountedState={[addListIsMounted, setAddListIsMounted]}
          hasTransitionedIn={addListHasTransitionedIn}
        />
      )}
      <div className={styles.searchbar}>
        <Icon icon="bx:search-alt-2" inline={true} />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <p className={styles.myLists}>My lists</p>
      <div className={styles.listsContainer}>
        {props.lists && !props.isLoading
          ? props.lists.filter((list) =>
              list.name.toLowerCase().includes(searchInput.toLowerCase())
            ).length
            ? props.lists
                .filter((list) =>
                  list.name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((list) => (
                  <ListMenuButton
                    id={list.id}
                    key={list.id}
                    list={list}
                    onClickCustomEvent={() => props.onListClick(list)}
                  />
                ))
            : searchInput === ""
            ? "You don't have any lists yet"
            : "No matches found"
          : "Loading..."}
      </div>
      <div
        className={styles.addListButton}
        onClick={() => setAddListIsMounted(true)}
      >
        <Icon icon="fluent:add-circle-24-filled" />
        <div>Add list</div>
      </div>
    </div>
  );
};

export default AllListsMenu;
