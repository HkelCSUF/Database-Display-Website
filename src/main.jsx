import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
// import "./styles.css";

createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <Layout/>
    </React.StrictMode>
);
