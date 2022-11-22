import { useState, useEffect } from "react";

export const useGetCurrentList = (lists, clickedList) => {

    const [currentList, setCurrentList] = useState(null);

    useEffect(() => {
        console.log("useGetCurrentList hook used");
        if (lists && clickedList) {
            lists.forEach(list => {
                if (list._id === clickedList._id) {
                    console.log("found element");
                    setCurrentList(list);
                }
            });
        }
        
        
    }, [lists, clickedList]);

    return currentList;
}