import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react"
import { getMockarooData, getUselessFact, getFirebaseDB } from "../api.js"
import DataDisplay from "../components/DataDisplay.jsx"
import { useMock } from "../hooks/mockaroo.js";


// Deal with mock stuff later. also do a better format for the fact API. 
// Mockaroo has a limit of 200 requests.
// Firebase it is then.

export default function MockPage() {
    

    const { items, table } = useMock();  
    console.log(table);
    



    return (
        <>
            <section>
                <div>
                    <DataDisplay
                        title={table}
                        children={items}
                    />
                </div>
            </section>
        </>
    );
}