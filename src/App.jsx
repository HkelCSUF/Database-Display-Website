import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
// import AboutPage from "./pages/AboutPage.jsx";
// import CollectionPage from "./pages/CollectionPage.jsx";
// import ContactPage from "./pages/ContactPage.jsx";
// import DetailsPage from "./pages/DetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
// import SearchPage from "./pages/SearchPage.jsx";
import MockPage from "./pages/DisplayMock.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* <Route path="/" element={<SearchPage />} /> */}
                    <Route path="/Mock" element={<MockPage/>} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
