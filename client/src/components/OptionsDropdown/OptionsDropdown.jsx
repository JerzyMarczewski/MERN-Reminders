import styles from "./OptionsDropdown.module.css";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from "../../Context/FetchContext";
import axios from "axios";

const OptionsDropdown = (props) => {
  const { value: username } = useContext(UserContext);
  const { fetchIteration, setFetchIteration } = useContext(FetchContext);
  const [showDoneItems, setShowDoneItems] = props.showDoneItems;

  const [dropdownShown, setDropdownShown] = useState(false);

  const handleDeleteClick = async () => {
    if (!username) return;

    if (props.currentList) {
      axios
        .post(`/${username}/lists/remove`, {
          listId: props.currentList._id,
        })
        .then(() => setFetchIteration(fetchIteration + 1))
        .then(props.resetClickedList())
        .then(() => setDropdownShown(false))
        .catch((err) => console.log(err));
    }
  };

  if (!dropdownShown)
    return (
      <div className={styles.options} onClick={() => setDropdownShown(true)}>
        <Icon icon="mi:options-horizontal" width="42" />
      </div>
    );

  return (
    <>
      <div className={styles.options}>
        <Icon icon="mi:options-horizontal" width="42" />
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownItem}
            onClick={() => {
              setDropdownShown(false);
              props.handleListInfoClick();
            }}
          >
            <div>List's information</div>
            <Icon icon="material-symbols:info-outline-rounded" />
          </div>
          <div
            className={styles.dropdownItem}
            onClick={() => {
              setShowDoneItems(!showDoneItems);
              setDropdownShown(false);
            }}
          >
            <div>{showDoneItems ? "Hide done items" : "Show done items"}</div>
            <Icon
              icon={showDoneItems ? "mdi:hide-outline" : "mdi:show-outline"}
            />
          </div>
          <div className={styles.dropdownItem} onClick={handleDeleteClick}>
            <div>Remove list</div>
            <Icon icon="mdi:bin-circle-outline" />
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

export default OptionsDropdown;
