import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/editpage.css";

export default function ManagePropertyPage() {
    const [house, setHouse] = useState(null);

    useEffect(() => {
        fetch("/temp-house-objects/sell-house-object.json")
            .then((res) => res.json())
            .then((data) => setHouse(data))
            .catch((err) => console.error("Error loading house:", err));
    }, []);

    if (!house) return (
        <div className="manage-property-page">Loading…</div>
    );

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
                    <div className="property-card">
                        <img src={house.imgs && house.imgs[0] && house.imgs[0].path} alt={house.address} />
                        <div className="price-row2">
                            <p className="house-price">${house.price.toLocaleString()}</p>
                        </div>
                        <p className="house-address">{house.address}</p>
                        <Link to="/edit">
                            <button className="edit-property-button">
                                Edit Your Property
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
