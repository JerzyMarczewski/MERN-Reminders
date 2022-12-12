import { useState, useRef } from "react";
import styles from "./ActiveListMenu.module.css";
import { Icon } from "@iconify/react";
import ListItem from "../ListItem/ListItem";
import OptionsDropdown from "../OptionsDropdown/OptionsDropdown";
import { useMountTransition } from "../../hooks/useMountTransition";
import AddList from "../AddList/AddList";
import { useEffect } from "react";

const ActiveListMenu = (props) => {
  const [itemCreationShown, setItemCreationShown] = useState(false);
  const [showDoneItems, setShowDoneItems] = useState(true);

  const myListsRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const newItemRef = useRef(null);
  const whitespaceRef = useRef(null);

  // for AddList component
  const [addListIsMounted, setAddListIsMounted] = useState(false);
  const addListHasTransitionedIn = useMountTransition(addListIsMounted, 500);

  useEffect(() => {
    setItemCreationShown(false);
  }, [props]);

  const handleClick = (e) => {
    if (myListsRef && myListsRef.current.contains(e.target)) {
      props.resetClickedList();
    }

    if (
      !itemCreationShown &&
      (e.target === itemsContainerRef.current ||
        e.target === whitespaceRef.current)
    ) {
      setItemCreationShown(true);
      return;
    }

    if (itemCreationShown && newItemRef.current !== e.target) {
      setItemCreationShown(false);

      return;
    }
  };

  if (!props.currentList)
    return (
      <div className={styles.containerWithNoListsSelected}>
        <div>No list selected</div>
      </div>
    );

  return (
    <div
      className={
        props.currentList
          ? `${styles.container} ${styles.visible}`
          : styles.container
      }
      onClick={(e) => handleClick(e)}
    >
      {(addListHasTransitionedIn || addListIsMounted) && (
        <AddList
          currentList={props.currentList}
          isMountedState={[addListIsMounted, setAddListIsMounted]}
          hasTransitionedIn={addListHasTransitionedIn}
        />
      )}
      <div className={styles.controls}>
        <div className={styles.myLists} ref={myListsRef}>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" width="22" />
          <div className={styles.myListsText}>My lists</div>
        </div>
        <OptionsDropdown
          currentList={props.currentList}
          resetClickedList={() => props.resetClickedList()}
          showDoneItems={[showDoneItems, setShowDoneItems]}
          handleListInfoClick={() => setAddListIsMounted(true)}
        />
      </div>
      <div
        className={styles.listName}
        style={
          props.currentList ? { color: `#${props.currentList.color}` } : {}
        }
      >
        {props.currentList ? props.currentList.name : ""}
      </div>
      <div className={styles.itemsContainer} ref={itemsContainerRef}>
        {props.currentList &&
        props.currentList.items.length === 0 &&
        !itemCreationShown ? (
          <div className={styles.noItems}>
            <p>No items</p>
            <p>Click anywhere below to add a new item</p>
          </div>
        ) : (
          ""
        )}
        {props.isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          props.currentList.items
            .filter((item) => {
              if (!showDoneItems) return !item.done;

              return item;
            })
            .sort((item1, item2) => item1.done - item2.done)
            .map((item) => (
              <ListItem
                key={item.id}
                item={item}
                parentList={props.currentList}
              />
            ))
        )}
        {itemCreationShown && !props.isLoading ? (
          <ListItem
            newItem={true}
            parentList={props.currentList}
            ref={newItemRef}
          />
        ) : (
          ""
        )}
        <div className={styles.whitespace} ref={whitespaceRef}></div>
      </div>
    </div>
  );
};

export default ActiveListMenu;
