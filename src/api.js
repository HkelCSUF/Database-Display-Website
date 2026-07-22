// Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "./components/firebaseDB"


const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

// API Links
const mockaroo = "https://my.api.mockaroo.com/users.json?key=";
const uselessfact = "https://uselessfacts.jsph.pl/api/v2/facts/random";

function getMockarooApiKey() {
    const apiKey = import.meta.env.VITE_MOCKAROO_API_KEY;
    return apiKey;
}

export async function getMockarooData() {

    const apiKey = getMockarooApiKey();
    const url = `${mockaroo}${apiKey}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("YOU FUCKED UP DUMBASS FIX IT NOW");
    }

    const data = await response.json();

    return data;
}

export async function getUselessFact() {
    const response = await fetch(uselessfact);
    const fact = await response.json();

    return fact.text;

}

export async function getFirebaseDB() {
    get(dbRef).then((snapshot) => {
        if(snapshot.exists()) {
            console.log(snapshot.val());
        }
        else {
            console.log("Shit I fucked up");
        }
    }).catch((error) => {
        console.error(error);
    });
}