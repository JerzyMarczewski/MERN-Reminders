import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from "./AddList.module.css";

// TODO - change width of control buttons

 
const COLORS = ["45B3E7","0078ff","bd00ff","ff9a00","01ff1f","e3ff00"]
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
    "ic:round-backpack"

]

const AddList = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
    const [isMounted, setIsMounted] = props.mounted;
    

    useEffect(() => {
        setInputValue("");
        setSelectedColor("45B3E7");
    }, []);


  return (
            <div className={`${styles.container} ${props.hasTransitionedIn && styles.in} ${isMounted && styles.visible} `}>
                <div className={styles.controls}>
                    <div onClick={() => {
                            setIsMounted(false);
                        }
                    }>Cancel</div>
                    <h3>New list</h3>
                    <div style={inputValue ? {} : {color: 'grey'}}>OK</div>
                </div>
                <div className={styles.listPreview}>
                    <div className={styles.listIcon} style={{backgroundColor: `#${selectedColor}`}}>
                        <Icon icon={selectedIcon} width="80"/>
                    </div>
                        <div className={styles.listName}>
                            <input 
                                type="text" 
                                placeholder="List name" 
                                style={{color: `#${selectedColor}`}}
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                                autoFocus
                            />
                    </div>
                </div>
                <div className={styles.colorSelect}>{
                    COLORS.map((color) => 
                        <div 
                            key={color}
                            className={styles.colorOption} 
                            style={color === selectedColor ? {backgroundColor: `#${color}`, borderWidth: "2px"} : {backgroundColor: `#${color}`}}
                            onClick={() => setSelectedColor(color)}
                        />)
                }</div>
                <div className={styles.iconSelect}>{
                    ICONS.map((icon) => 
                        <div 
                            key={icon}    
                            className={styles.iconCircle}  
                            style={icon === selectedIcon ? {borderWidth: "2px"} : {}}
                            onClick={() => setSelectedIcon(icon)}
                        >
                            <Icon icon={icon} />
                        </div>
                        
                    )
                }</div>
            </div>
    )
}

export default AddList;