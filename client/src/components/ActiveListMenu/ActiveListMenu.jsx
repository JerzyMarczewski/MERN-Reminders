import { useState, useRef } from "react";
import styles from "./ActiveListMenu.module.css";
import { Icon } from '@iconify/react';
import ListItem from "../ListItem/ListItem";


const ActiveListMenu = (props) => {
    const [itemCreationShown, setItemCreationShown] = useState(false);
    
    
    const myListsRef = useRef(null);
    const itemsContainerRef = useRef(null);
    const newItemRef = useRef(null);


    const handleClick = (e) => {


        if (myListsRef && myListsRef.current.contains(e.target)) {
            props.onMyListClick();
        }

        if (!itemCreationShown && itemsContainerRef.current === e.target) {
            setItemCreationShown(true);
            return;
        } 
        if (itemCreationShown && newItemRef.current !== e.target) {
            setItemCreationShown(false);
            
            return;
        }
        
        // if (itemsContainerRef && itemsContainerRef.current.contains(document.activeElement)){
        //     console.log("some element is focused");
        //     return;
        // }
            
    }

    if (!props.currentList)
        return (<div className={styles.container}>No list selected</div>)
    
    return (
        <div className={ props.currentList ?`${styles.container} ${styles.visible}` : styles.container}  onClick={e => handleClick(e)}>
            <div className={styles.controls}>
                <div className={styles.myLists} ref={myListsRef}>
                    <Icon icon="material-symbols:arrow-back-ios-new-rounded" width="22"/>
                    <div className={styles.myListsText}>My lists</div>
                </div>
                <Icon icon="mi:options-horizontal" width="42"/>
            </div>
            <div 
                className={styles.listName} 
                style={props.currentList ? {color: `#${props.currentList.color}`} : {}}
            >
                {props.currentList ? props.currentList.name: ""}
            </div>      
            <div className={styles.itemsContainer} ref={itemsContainerRef}>
            {    
                props.isLoading
                ?
                "Loading..."
                :
                props.currentList.items.map((item) => 
                    <ListItem 
                        key={item.id}
                        item={item}
                        parentList={props.currentList}
                    />
                )
            }
            {itemCreationShown && !props.isLoading &&
                 <ListItem 
                    newItem={true}
                    parentList={props.currentList}
                    ref={newItemRef}
                 />
            }
            </div>
            
        </div>
    )
}

export default ActiveListMenu;