import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as databaseRef, onValue, remove } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import "../styles/editpage.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function ManagePropertyPage() {
    const [houses, setHouses] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        
        const db = getDatabase();
        const housesRef = databaseRef(db, 'houses/');
        
        const unsubscribe = onValue(housesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setHouses([]);
                setLoading(false);
                return;
            }
            
            // Filter houses by userId matching current user
            const housesArray = Object.keys(data)
                .map((key) => ({ ...data[key], id: key }))
                .filter((house) => house.userId === user.uid);
            
            setHouses(housesArray);
            setLoading(false);
        },
        (err) => {
            console.error("Error loading houses:", err);
            setLoading(false);
        }
    );

        return () => unsubscribe();
    }, [user]);

    function handleHouseClick(house) {
        navigate(`/edit/${house.id}`);
    }

    async function handleDelete(houseId, e) {
        e.stopPropagation(); // Prevent triggering the card click
        
        if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
            return;
        }

        try {
            const db = getDatabase();
            const houseRef = databaseRef(db, `houses/${houseId}`);
            await remove(houseRef);
        } catch (err) {
            console.error("Error deleting property:", err);
            alert("Failed to delete property. Please try again.");
        }
    }

    if (!user) {
        return <div className="manage-property-page">Loading…</div>;
    }

    return (
        <div className="manage-property-page">
            <header>
                <div className="container-sell">
                    <h1 className="h1-sell">Manage Your Property</h1>
                    <p className="lead-sell">View your listing here.</p>
                </div>
            </header>

            <section className="body-manage">
                <h2 className="property2">Current listing</h2>

                {loading ? (
                    <div className="loading-state" aria-live="polite">
                        <ClipLoader />
                        <p>Loading your listings…</p>
                    </div>
                    ) : (
                    <div className="listing-selection">
                        {houses.length === 0 ? (
                            <p>No properties found. Create a new listing on the Sell page.</p>
                        ) : (
                            houses.map((house) => (
                                <div key={house.id} className="property-card" style={{marginBottom: '20px'}}>
                                    <img
                                        src={house.img && house.img[0] ? house.img[0] : '/images/placeholder.jpg'}
                                        alt={house.address}
                                    />
                                    <div className="price-row2">
                                        <p className="house-price">${house.price?.toLocaleString() || '0'}</p>
                                    </div>
                                    <p className="house-address">{house.address}</p>
                                    <button
                                        className="edit-property-button"
                                        onClick={() => handleHouseClick(house)}
                                    >
                                        Edit Your Property
                                    </button>
                                    <button
                                        className="edit-property-button"
                                        onClick={(e) => handleDelete(house.id, e)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
