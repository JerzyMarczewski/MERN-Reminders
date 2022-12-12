import { useState, useContext, useEffect, useRef, forwardRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from "../../Context/FetchContext";
import { Icon } from "@iconify/react";
import styles from "./ListItem.module.css";
import axios from "axios";

const ListItem = forwardRef((props, ref) => {
  const { value: username } = useContext(UserContext);
  const { fetchIteration, setFetchIteration } = useContext(FetchContext);

  const [inputValue, setInputValue] = useState("");

  // making the fowarRef optional
  const localRef = useRef(null);
  const inputRef = ref || localRef;

  useEffect(() => {
    if (!props.newItem) setInputValue(props.item.name);

    if (props.newItem && inputRef) inputRef.current.focus();

    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        inputRef.current.blur();
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props]);

  const handleItemBlur = async () => {
    // scenario when the current item is a temporary list item
    if (props.parentList && props.newItem && inputValue !== "") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/${username}/lists/items/add`,
          {
            listId: props.parentList._id,
            name: inputValue,
            date: null,
          }
        )
        .then(() => setFetchIteration(fetchIteration + 1))
        .catch((err) => console.log(err));

      return;
    }

    // scenario when the current item is a regular list item
    if (props.parentList && props.item) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/${username}/lists/items/edit-name`,
          {
            listId: props.parentList._id,
            itemId: props.item._id,
            name: inputValue,
          }
        )
        .then(() => setFetchIteration(fetchIteration + 1))
        .catch((err) => console.log(err));
    }
  };

  const handleRemove = async () => {
    if (!props.parentList || !props.item) return;

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/${username}/lists/items/remove`,
        {
          listId: props.parentList._id,
          itemId: props.item._id,
        }
      )
      .then(() => setFetchIteration(fetchIteration + 1))
      .catch((err) => console.log(err));
  };

  const handleDoneClick = async () => {
    if (!props.parentList || !props.item) return;

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/${username}/lists/items/edit-status`,
        {
          listId: props.parentList._id,
          itemId: props.item._id,
        }
      )
      .then(() => setFetchIteration(fetchIteration + 1))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      {!props.newItem ? (
        <Icon
          icon={
            props.item.done
              ? "material-symbols:circle"
              : "material-symbols:circle-outline"
          }
          width="32"
          color="000000"
          opacity="0.7"
          onClick={handleDoneClick}
        />
      ) : (
        <Icon
          width="32"
          color="000000"
          opacity="0.7"
          icon={"material-symbols:circle-outline"}
        />
      )}
      <input
        type="text"
        placeholder="new item"
        style={
          props.item && props.item.done
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleItemBlur}
      />
      <Icon
        icon="mdi:bin-circle-outline"
        color="red"
        width="32"
        opacity="0.8"
        onClick={handleRemove}
      />
    </div>
  );
});

export default ListItem;
