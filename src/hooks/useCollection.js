import { useEffect, useMemo, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useAuth } from "./useAuth.jsx";

export function getCollectionItemId(item) {
    return `${item.source.toLowerCase()}-${item.id}`;
}

export function useCollection() {
    const { currentUser } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!currentUser) {
            setItems([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const collectionRef = collection(db, "users", currentUser.uid, "collection");
        const collectionQuery = query(collectionRef, orderBy("addedAt", "desc"));

        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
            const savedItems = snapshot.docs.map((movieDoc) => ({
                collectionId: movieDoc.id,
                ...movieDoc.data()
            }));

            setItems(savedItems);
            setError("");
            setLoading(false);
        }, () => {
            setError("Unable to load your collection right now.");
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const itemIds = useMemo(() => new Set(items.map((item) => item.collectionId)), [items]);

    async function addToCollection(item) {
        if (!currentUser) {
            throw new Error("login-required");
        }

        const collectionId = getCollectionItemId(item);
        const itemRef = doc(db, "users", currentUser.uid, "collection", collectionId);
        console.log(item);

        await setDoc(itemRef, {
            ...item,
            collectionId,
            addedAt: serverTimestamp()
        });
    }

    async function removeFromCollection(item) {
        if (!currentUser) {
            throw new Error("login-required");
        }

        // TODO: Lab 11 task 2 - delete this movie document from Firestore.
        // A Firestore document is the closest term to a database record/row.
        // Each user's saved movies live at:
        // users/{currentUser.uid}/collection/{collectionId}
        const collectionId = item.collectionId || getCollectionItemId(item);

        // TODO: Import deleteDoc from firebase/firestore and call:
        const itemRef = doc(db, "users", currentUser.uid, "collection", collectionId); //path to the Firestore document for this movie, see the addToCollection function above for an example of how to get the document reference.
        await deleteDoc(itemRef);

        // console.log("TODO: delete this Firestore document", itemRef.path);
        // throw new Error("not-implemented");
    }

    return {
        addToCollection,
        error,
        isSaved: (item) => itemIds.has(getCollectionItemId(item)),
        items,
        loading,
        removeFromCollection
    };
}
