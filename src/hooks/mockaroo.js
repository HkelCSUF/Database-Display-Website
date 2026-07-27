import { getMockarooData } from "../api";
import { useState, useEffect } from "react";

export function useMock() {
    const [items, setItems] = useState([]);
    const [table, setTable] = useState("");

    useEffect(() => {
        // if(table === "") {
        //     console.log("null table selected for mock")
        //     return;
        // }
        async function loadData() {
            const mockItems = await getMockarooData("users");
            setTable(mockItems.table);  
            setItems(mockItems.data);
            console.log(table);
            console.log(items);
            console.log(mockItems);
        }
        
        loadData();

    }, []);

    return {
        items,
        table
    }
}