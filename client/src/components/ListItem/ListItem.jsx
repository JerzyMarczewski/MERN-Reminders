import { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from '../../Context/FetchContext';
import axios from "axios";




const ListItem = forwardRef((props, ref) => {
  const {value: username} = useContext(UserContext);
  const {fetchIteration, setFetchIteration} = useContext(FetchContext);

  const [inputValue, setInputValue] = useState("");


  // making the fowarRef optional
  const localRef = useRef(null);
  const inputRef = ref || localRef; 

  useEffect(() => {
    if (!props.newItem)
      setInputValue(props.item.name);

    if (props.newItem && inputRef)
      inputRef.current.focus();


    const listener = (e) => {
      
      if (e.code === "Enter" || e.code === "NumpadEnter"){
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
    if (props.newItem && inputRef) return; // ! this will be a different post request


    axios.post(`http://localhost:5000/${username}/lists/items/edit-name`, {
        listId: props.parentList._id,
        itemId: props.item._id,
        name: inputValue
      })
      .then(() => setFetchIteration(fetchIteration + 1))
      .catch(err => console.log(err));
  }

    
  return (
    <div>
        {fetchIteration}
        <input ref={inputRef}
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          onBlur={handleItemBlur}
        />
        {props.item && props.item.name}
    </div>
  )
});

export default ListItem;