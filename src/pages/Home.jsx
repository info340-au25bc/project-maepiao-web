import React, { useState, useEffect } from "react";

export default function Home() {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        fetch('/temp-house-objects/temp-house-objects.json')
            .then((res) => res.json())
            .then((data) => setHouses(data))
            .catch((err) => console.error("Error loading houses: ", err))
    }, [])

    return (
        <div className="properties-section">
            <h1>Browse Properties</h1>
            <p>Top Picks Near You</p>
            <div className="grid-container">
                {houses.map((house) => {
                    return <HouseCard houseObj={house} key={house.address}/>
                })}
            </div>
        </div>
    );
}

function HouseCard(props) {
    const house = props.houseObj;
    return (
        <div className="property-card">
            <img src={house.img} alt={house.address} />
            <div className="price-row">
                <p className="house-price">${house.price.toLocaleString()}</p>
                <span className="material-symbols-outlined favorite">favorite</span>
            </div>
            <p className="house-address">{house.address}</p>
            <p className="house-details"><span className="material-symbols-outlined bed">bed</span>{house.beds} beds <span className="material-symbols-outlined bathtub">bathtub</span>{house.baths} Bathrooms <span className="material-symbols-outlined square-foot">square_foot</span>{house.sqft}</p>
        </div>
    );
}
