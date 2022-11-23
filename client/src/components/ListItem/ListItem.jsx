import { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from '../../Context/FetchContext';
import axios from "axios";

// TODO: add the possibility of adding and editing the date
// TODO: make this element look good
// TODO: add the ability to remove items


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
    // scenario when the current item is a temporary list item 
    if (props.parentList && props.newItem && inputValue !== ""){
      axios.post(`http://localhost:5000/${username}/lists/items/add`, {
          listId: props.parentList._id,
          name: inputValue,
          date: null // ! change for a real value in the future 
        })
        .then(() => setFetchIteration(fetchIteration + 1))
        .catch(err => console.log(err));
      
      
      return;
    }
      
    // scenario when the current item is a regular list item  
    if (props.parentList && props.item) {
      axios.post(`http://localhost:5000/${username}/lists/items/edit-name`, {
        listId: props.parentList._id,
        itemId: props.item._id,
        name: inputValue
      })
      .then(() => setFetchIteration(fetchIteration + 1))
      .catch(err => console.log(err));
    }
  }

  const handleRemove = async () => {
    if (!props.parentList || !props.item)
      return;
      
    axios.post(`http://localhost:5000/${username}/lists/items/remove`, {
        listId: props.parentList._id,
        itemId: props.item._id
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
        {!props.newItem &&<button onClick={handleRemove}>remove</button>}
    </div>
  )
});

export default ListItem;