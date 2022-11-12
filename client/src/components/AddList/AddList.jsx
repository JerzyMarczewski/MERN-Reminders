import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from "./AddList.module.css";

// ! temp
const COLOR = "45B3E7";
const HIDDEN = !true;

const AddList = () => {
    const [inputValue, setInputValue] = useState("");

  return (
    <>
        <div className={HIDDEN ? `${styles.background} ${styles.hidden}` : styles.background}></div>
        <div className={HIDDEN ? `${styles.container} ${styles.hidden}`: styles.container}>
            <div className={styles.controls}>
                <div>Cancel</div>
                <h3>New list</h3>
                <div>OK</div>
            </div>
            <div className={styles.listPreview}>
                <div className={styles.listIcon} style={{backgroundColor: `#${COLOR}`}}>
                    <Icon icon="ant-design:unordered-list-outlined" width="80"/>
                </div>
                <div className={styles.listName}>
                    <input 
                        type="text" 
                        placeholder="List name" 
                        style={{color: `#${COLOR}`}}
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} />
                </div>
            </div>
            
        </div>
    </>
  )
}

export default AddList;