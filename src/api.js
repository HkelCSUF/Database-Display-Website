const mockaroo = "https://my.api.mockaroo.com/users.json?key="

export function getMockarooApiKey() {
    const apiKey = import.meta.env.VITE_MOCKAROO_API_KEY;
}

export async function getMockarooData() {

    const apiKey = getMockarooApiKey();
    const url = `${mockaroo}${apiKey}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("YOU FUCKED UP DUMBASS FIX IT NOW");
    }

    const data = await response.json();
}