import { useState, useEffect } from "react";

export const useGetCurrentList = (lists, clickedList) => {

    const [currentList, setCurrentList] = useState(null);

    useEffect(() => {
        if (clickedList === null)
            setCurrentList(null);
        
        if (lists && clickedList) {
            lists.forEach(list => {
                if (list._id === clickedList._id) {
                    setCurrentList(list);
                }
            });
        }
        
        
    }, [lists, clickedList]);

    return currentList;
}