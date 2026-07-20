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