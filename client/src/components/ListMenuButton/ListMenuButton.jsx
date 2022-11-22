import styles from "./ListMenuButton.module.css";
import { Icon } from '@iconify/react';


const ListMenuButton = (props) => {

  return (
    <div className={styles.container} onClick={() => props.onClickCustomEvent()}>
        <div className={styles.listName}>
              <div className={styles.listIcon} style={{backgroundColor: `#${props.list.color}`}}>
                <Icon icon="ant-design:unordered-list-outlined"/>
              </div>
              <div>{props.list.name}</div>
            </div>
            <div className={styles.numberOfItemsButton}>
              <div>{props.list.items.filter(item => item.done === false).length}</div>
              <Icon icon="ic:round-greater-than" width="16" />
        </div>
    </div>
  )
}

export default ListMenuButton;