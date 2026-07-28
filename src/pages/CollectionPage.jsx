import { useState } from "react";
import { Link } from "react-router-dom";
// import LastVisited from "../components/LastVisited.jsx";
// import ResultCard from "../components/ResultCard.jsx";
import DataDisplay from "../components/DataDisplay.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useCollection } from "../hooks/useCollection.js";

export default function CollectionPage() {
    const { currentUser } = useAuth();
    const { error, items, loading, removeFromCollection } = useCollection();
    const [showRemoveTodoModal, setShowRemoveTodoModal] = useState(false);

    async function handleRemove(item) {
        try {
            await removeFromCollection(item);
        } catch (removeError) {
            console.error("unable to remove", removeError);
        }
    }

    function getTitle(item) {
        return item?.title || item?.name || item?.table || item?.collectionId || item?.source || "Collection Item";
    }

    console.log(items);

    if (!currentUser) {
        return (
            <>
                <section className="card shadow-sm mb-4" role="alert">
                    <div className="card-body">
                        <h2 className="h4 card-title">My Collection</h2>
                        <p>Please log in to see your collection.</p>
                        <Link className="btn btn-primary navbar-theme-color" to="/login">Login</Link>
                    </div>
                </section>
                {/* <LastVisited pageName="collection" /> */}
            </>
        );
    }

    return (
        <>
            <section className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="card-title">My Collection</h2>
                    {loading && <p className="mb-0">Loading your saved titles...</p>}
                    {error && <p className="alert alert-warning mb-0">{error}</p>}
                    {!loading && !error && items.length === 0 && <p className="mb-0">Your collection is empty.</p>}
                </div>
            </section>

            <div className="collection-tables">
                {items.map((item) => (
                    <div key={item.collectionId} className="mb-4">
                        <DataDisplay
                            title={getTitle(item)}
                            children={item.data}
                            actionLabel="Remove from My Collection"
                            onAction={() => handleRemove(item)}
                        />
                    </div>
                ))}
            </div>
            {showRemoveTodoModal && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title h5">Lab 11 TODO</h2>
                                    <button className="btn-close" type="button" aria-label="Close" onClick={() => setShowRemoveTodoModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">Remove from My Collection has not been implemented yet. Students will delete the matching Firestore document by its collection ID.</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary navbar-theme-color" type="button" onClick={() => setShowRemoveTodoModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </>
            )}
            {/* <LastVisited pageName="collection" /> */}
        </>
    );
}
