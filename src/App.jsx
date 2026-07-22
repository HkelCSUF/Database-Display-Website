import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react"
import { getMockarooData, getUselessFact, getFirebaseDB } from "./api.js"


// Deal with mock stuff later. also do a better format for the fact API. 
// Mockaroo has a limit of 200 requests.
// Firebase it is then.

export default function App() {

    const [fact, setFact] = useState("");
    const [mock, setMock] = useState([]);
    const [fireMock, setFireMock] = useState({});
    useEffect(() => {
        async function loadBasic() {
            try {
                setFact(getUselessFact());
                getFirebaseDB();
            }
            catch(error) {
                console.error(`DUMBASS: `, error);
            }
        }
        // setMock(getMockarooData());
        loadBasic();
    }, [])
    console.log(fact);
    // console.log(mock);


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