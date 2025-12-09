import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../layouts/Header";
import Home from "../pages/Home";
import SellPage from "../pages/SellPage";
import ManagePropertyPage from "../pages/ManagePropertyPage";
import AccountPage from "../pages/AccountPage";
import EditProperty from "../pages/EditProperty";
import Footer from "../layouts/Footer";
import LoginPage from "../pages/LoginPage.jsx";
import { UserProvider } from "../contexts/UserContext";
import ProtectedRoute from "./ProtectedRoute";


export default function App() {
    return (
        <UserProvider>
            <div>
                <Header />
                <main id="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sell" element={
                            <ProtectedRoute>
                                <SellPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/manage" element={
                            <ProtectedRoute>
                                <ManagePropertyPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                        <Route path="/edit/:houseId" element={
                            <ProtectedRoute>
                                <EditProperty />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/login" element={<LoginPage />} /> 
                    </Routes>
                </main>
                <Footer />
            </div>
        </UserProvider>
    );
}