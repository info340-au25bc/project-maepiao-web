import React from "react";
import { Link } from "react-router-dom";
import "../styles/editpage.css";

export default function ManagePropertyPage() {
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
                        <img src="images/house1.jpg" alt="house-1" />
                        <div className="price-row2">
                            <p className="house-price">$729,000</p>
                        </div>
                        <p className="house-address">2699 Green Valley, Highland Lake, FL</p>
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
