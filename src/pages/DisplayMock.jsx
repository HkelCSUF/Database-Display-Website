import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { getMockarooData, getUselessFact, getFirebaseDB } from "../api.js"
import DataDisplay from "../components/DataDisplay.jsx"
import { useMock } from "../hooks/mockaroo.js";
import { useCollection } from "../hooks/useCollection.js";
import { useAuth } from "../hooks/useAuth.jsx";




// Deal with mock stuff later. also do a better format for the fact API. 
// Mockaroo has a limit of 200 requests.
// Firebase it is then.

export default function MockPage() {
    const {currentUser} = useAuth();
    const { addToCollection, isSaved } = useCollection();
    const [collectionStatus, setCollectionStatus] = useState("");
    const [collectionStatusType, setCollectionStatusType] = useState("success");

    const { items, table, payload } = useMock();  
    console.log(table);
    
    async function handleAddToCollection(item) {
        if (!currentUser) {
            setShowLoginModal(true);
            return;
        }

        try {
            await addToCollection(item);
            setCollectionStatus(`${item.title} was added to your collection.`);
            setCollectionStatusType("success");
        } catch (error) {
            setCollectionStatus("Unable to add this title right now.");
            setCollectionStatusType("warning");
        }
    }


    return (
        <>
            <section>
                <div>
                    <DataDisplay
                        title={table}
                        children={items}
                        action={
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleAddToCollection(payload)}
                                disabled={currentUser && isSaved(payload)}
                            >
                                {currentUser && isSaved(payload) ? "In My Collection" : "Add to My Collection"}
                            </button>
                        }
                    />
                </div>
            </section>
        </>
    );
}