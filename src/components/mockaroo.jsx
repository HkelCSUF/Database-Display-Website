// Helper for Mockaroo functions so that they can be sent into the firebase and cost me 200$ later.
import { getMockarooData } from "../api";


export default function DisplayMockaroo({ item }) {
    return(
        <div>
            <article>
                <h3>{item.first_name}, {item.last_name}</h3>
                <p>{item.email}</p>
            </article>
        </div>
    )
}