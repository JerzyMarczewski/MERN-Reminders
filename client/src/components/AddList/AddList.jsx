import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import useMountTransition from '../../hooks/useMountTransition';
import styles from "./AddList.module.css";

// ! temp
const COLOR = "45B3E7";

const AddList = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [isMounted, setIsMounted] = props.isVisible;
    const hasTransitionedIn = useMountTransition(isMounted, 1000)



  return (
        <>
            {(hasTransitionedIn || isMounted) && (
                    <div className={`${styles.container} ${hasTransitionedIn && styles.in} ${isMounted && styles.visible} `}>
                        <div className={styles.controls}>
                            <div onClick={() => setIsMounted(false)}>Cancel</div>
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
            )}
        </>
    )
}

export default AddList;