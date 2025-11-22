import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import Home from "../pages/Home";
import SellPage from "../pages/SellPage";
import ManagePropertyPage from "../pages/ManagePropertyPage";
import AccountPage from "../pages/AccountPage";
import EditProperty from "../pages/EditProperty";
import Footer from "../layouts/Footer";

export default function App(props) {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sell" element={<SellPage />} />
                        <Route path="/manage" element={<ManagePropertyPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/edit" element={<EditProperty />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}