import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react"
import { getMockarooData, getUselessFact } from "./api.js"


// Deal with mock stuff later. also do a better format for the fact API. 
// Mockaroo has a limit of 200 requests.
// Firebase it is then.

export default function App() {

    const [fact, setFact] = useState("");
    const [mock, setMock] = useState([]);
    useEffect(() => {
        setFact(getUselessFact());
        // setMock(getMockarooData());
    }, [])
    console.log(fact);
    console.log(mock);

    return (
        <>
            <section>
                <article>
                    <h3>{fact}</h3>
                </article>
            </section>
        </>
    );
}