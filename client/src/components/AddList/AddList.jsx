import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import styles from "./AddList.module.css";
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from "../../Context/FetchContext";
import axios from "axios";

const COLORS = ["45B3E7", "0078ff", "bd00ff", "ff9a00", "01ff1f", "e3ff00"];
const ICONS = [
  "ic:round-format-list-bulleted",
  "ic:round-school",
  "ic:sharp-cake",
  "ic:baseline-bookmark",
  "ic:baseline-videogame-asset",
  "ic:round-shopping-cart",
  "ic:round-tv",
  "ic:round-message",
  "ic:round-shopping-bag",
  "ic:round-sports-handball",
  "ic:round-airplanemode-active",
  "ic:round-backpack",
];

const AddList = (props) => {
  const { value: username } = useContext(UserContext);
  const { fetchIteration, setFetchIteration } = useContext(FetchContext);

  const [inputValue, setInputValue] = useState(
    props.currentList ? props.currentList.name : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    props.currentList ? props.currentList.color : COLORS[0]
  );
  const [selectedIcon, setSelectedIcon] = useState(
    props.currentList ? props.currentList.icon : ICONS[0]
  );
  const [isMounted, setIsMounted] = props.isMountedState;

  const handleOkClick = async () => {
    if (inputValue === "") return;

    if (props.currentList) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/${username}/lists/edit`, {
          listId: props.currentList._id,
          newName: inputValue,
          newColor: selectedColor,
          newIcon: selectedIcon,
        })
        .then(() => setFetchIteration(fetchIteration + 1))
        .then(() => setIsMounted(false))
        .catch((err) => console.log(err));
    }

    if (!props.currentList) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/${username}/lists/add`, {
          name: inputValue,
          color: selectedColor,
          icon: selectedIcon,
        })
        .then(() => setFetchIteration(fetchIteration + 1))
        .then(() => setIsMounted(false))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div
        className={`${styles.background} ${
          props.hasTransitionedIn && styles.in
        } ${isMounted && styles.visible} `}
        onClick={() => setIsMounted(false)}
      ></div>
      <div
        className={`${styles.container} ${
          props.hasTransitionedIn && styles.in
        } ${isMounted && styles.visible} `}
      >
        <div className={styles.controls}>
          <div className={styles.cancelContainer}>
            <div onClick={() => setIsMounted(false)}>Cancel</div>
          </div>
          <h3>{props.currentList ? "List info" : "New list"}</h3>
          <div className={styles.okContainer}>
            <div
              style={inputValue ? {} : { color: "grey" }}
              onClick={handleOkClick}
            >
              OK
            </div>
          </div>
        </div>
        <div className={styles.listPreview}>
          <div
            className={styles.listIcon}
            style={{ backgroundColor: `#${selectedColor}` }}
          >
            <Icon icon={selectedIcon} width="80" />
          </div>
          <div className={styles.listName}>
            <input
              type="text"
              placeholder="List name"
              style={{ color: `#${selectedColor}` }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.colorSelect}>
          {COLORS.map((color) => (
            <div
              key={color}
              className={styles.colorOption}
              style={
                color === selectedColor
                  ? { backgroundColor: `#${color}`, borderWidth: "2px" }
                  : { backgroundColor: `#${color}` }
              }
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div className={styles.iconSelect}>
          {ICONS.map((icon) => (
            <div
              key={icon}
              className={styles.iconCircle}
              style={icon === selectedIcon ? { borderWidth: "2px" } : {}}
              onClick={() => setSelectedIcon(icon)}
            >
              <Icon icon={icon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddList;
