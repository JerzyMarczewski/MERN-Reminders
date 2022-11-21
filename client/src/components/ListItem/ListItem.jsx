import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from "../../Context/UserContext";
import { FetchContext } from '../../Context/FetchContext';
import axios from "axios";




const ListItem = (props) => {
  const {value: username} = useContext(UserContext);
  const {fetchIteration, setFetchIteration} = useContext(FetchContext);

  const [inputValue, setInputValue] = useState(props.item.name);

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current);
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
  }, []);
  

  const handleItemBlur = async () => {
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
    </div>
  )
}

export default ListItem