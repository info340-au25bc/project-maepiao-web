import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as databaseRef, onValue } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import "../styles/editpage.css";

export default function ManagePropertyPage() {
    const [houses, setHouses] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const db = getDatabase();
        const housesRef = databaseRef(db, 'houses/');
        
        const unsubscribe = onValue(housesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setHouses([]);
                return;
            }
            
            // Filter houses by userId matching current user
            const housesArray = Object.keys(data)
                .map((key) => ({ ...data[key], id: key }))
                .filter((house) => house.userId === user.uid);
            
            setHouses(housesArray);
        });

        return () => unsubscribe();
    }, [user]);

    function handleHouseClick(house) {
        navigate(`/edit/${house.id}`);
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
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
