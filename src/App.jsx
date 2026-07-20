import { BrowserRouter, Route, Routes } from "react-router-dom";
import { } from "react"
import { getMockarooData, getUselessFact } from "./api.js"

export default function App() {

    const fact = await getUselessFact();
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