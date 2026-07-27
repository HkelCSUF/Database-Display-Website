import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Layout({ children }) {
    const { currentUser, logOut } = useAuth();
    const displayName = currentUser?.displayName || currentUser?.email;
    const [fact, setFact] = useState("");

    useEffect(() => {
        setFact(getUselessFact());
    }, []);

    return (
        <>
            <header className="bg-primary text-white py-5 navbar-theme-color">
                <div className="container">
                    <h1>Movies Portal</h1>
                    <p className="mb-0">Welcome to the React Movies Portal. Explore API data with components and state.</p>
                </div>
            </header>

            <nav className="navbar navbar-expand-lg navbar-theme-color-2">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                        aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="main-nav" className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto fw-bold">
                            <li className="nav-item"><NavLink className="nav-link" to="/Mock">Mock Data</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/collection">My Collection</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact Us</NavLink></li>
                            {currentUser ? (
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle auth-nav-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {displayName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><span className="dropdown-item-text text-muted">{currentUser.email}</span></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" type="button" onClick={logOut}>Sign out</button></li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container my-4">{children}</main>

            <footer>
                <p>{fact}</p>
                <p>Contact me <a href="mailto:hayden.e.kelley@gmail.com">hayden.e.kelley@gmail.com</a></p>
            </footer>
        </>
    );
}
