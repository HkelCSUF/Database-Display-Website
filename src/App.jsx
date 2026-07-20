import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react"
import { getMockarooData, getUselessFact } from "./api.js"

const fact = getUselessFact();
// Deal with mock stuff later. also do a better format for the fact API. 

export default function App() {

    
    console.log(fact);

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