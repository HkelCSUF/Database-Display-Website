import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react"
import { getMockarooData, getUselessFact, getFirebaseDB } from "../api.js"
import DataDisplay from "./DataDisplay.jsx"
import { useMock } from "../hooks/mockaroo.js";


// Deal with mock stuff later. also do a better format for the fact API. 
// Mockaroo has a limit of 200 requests.
// Firebase it is then.

export default function Layout() {
    const [fact, setFact] = useState("");

    const { items, table } = useMock();  
    console.log(table);
    useEffect(() => {

        setFact(getUselessFact());

    }, []);



    return (
        <>
            <section>
                <article>
                    <h3>{fact}</h3>
                </article>
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