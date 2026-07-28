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

    if (!item) return "";

    // If a collectionId already exists, use it directly
    if (item.collectionId) return item.collectionId;

    // Existing code path for items that have a source and id (e.g., external APIs)
    if (item.source && item.id) {
        try {
            return `${String(item.source).toLowerCase()}-${item.id}`;
        } catch (e) {
            // fall through to other strategies
        }
    }

    // Common fallback fields you might find in mock data
    const fallbackKeys = ["id", "ID", "uuid", "uid", "email", "name"];
    for (const k of fallbackKeys) {
        if (item[k]) return `mock-${String(item[k])}`;
    }

    // As a last resort, produce a deterministic short hash from the item's JSON
    try {
        const str = JSON.stringify(item);
        // simple string hash (djb2-like) to produce a short deterministic id
        let h = 5381;
        for (let i = 0; i < str.length; i++) {
            h = ((h << 5) + h) + str.charCodeAt(i); /* h * 33 + c */
            h = h & h; // keep in 32-bit int range
        }
        return `obj-${Math.abs(h).toString(36)}`;
    } catch (e) {
        // final fallback - random id (should be very rare)
        return `obj-${Math.random().toString(36).slice(2, 9)}`;
    }
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
                collectionId: movieDoc.table,
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
        const collectionId = item.table || getCollectionItemId(item);

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
