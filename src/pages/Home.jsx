import React, { useState, useEffect } from "react";
import { getDatabase, ref as databaseRef, onValue } from "firebase/database";

export default function Home() {
    const [houses, setHouses] = useState([]);

    const [selectedHouse, setSelectedHouse] = useState(null);

    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState(15);
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = (e) => {
        e.preventDefault();
        if (!selectedHouse) return;

        const principal = selectedHouse.price - Number(downPayment);
        const monthlyRate = Number(interestRate) / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

        setMonthlyPayment(payment);
    }

    useEffect(() => {
        const db = getDatabase();
        const housesRef = databaseRef(db, 'houses/');
        onValue(housesRef, (snapshot) => {
            const data = snapshot.val();
            const housesArray = Object.keys(data).map((key) => data[key])
            setHouses(housesArray);
        })
    }, []);

    useEffect(() => {
        if (selectedHouse) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [selectedHouse]);

    useEffect(() => {
        if (selectedHouse) {
            setDownPayment('');
            setInterestRate('');
            setLoanTerm(15);
            setMonthlyPayment(null);
        }
    }, [selectedHouse]);

    return (
        <div className="properties-section">
            <h1>Browse Properties</h1>
            <p>Top Picks Near You</p>
            <div className="grid-container">
                {houses.map((house) => {
                    return <HouseCard houseObj={house} key={house.address} setSelectedHouse={setSelectedHouse} />
                })}
            </div>
            {selectedHouse && (
                <div className="overlay" onClick={() => setSelectedHouse(null)}>
                    <div className="property-view-property-card" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedHouse.img?.[0]} alt={selectedHouse.address} className="main-photo"/>
                        <div className="details">
                            <p className="property-view-address">{selectedHouse.address}</p>
                            <p className="property-view-price">${selectedHouse.price.toLocaleString()}</p>
                            <p><span className="material-symbols-outlined bed">bed</span>{selectedHouse.beds} beds <span className="material-symbols-outlined bathtub">bathtub</span>{selectedHouse.baths} Bathrooms <span className="material-symbols-outlined square-foot">square_foot</span>{selectedHouse.sqft}</p>
                        </div>
                        <div className="estimate-section">
                            <p>Estimate Your Monthly Payment</p>
                            <form className="estimate-form" onSubmit={calculatePayment}>
                                <label>Down Payment</label>
                                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="$" required/>

                                <label>Interest Rate</label>
                                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="%" required/>

                                <label>Loan Term</label>
                                <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}>
                                    <option value={15}>15 years</option>
                                    <option value={20}>20 years</option>
                                    <option value={30}>30 years</option>
                                </select>
                                <button type="submit">Calculate</button>
                            </form>
                            {monthlyPayment && (
                                <div className="payment-estimate">
                                    <p>Estimated Monthly Payment: ${monthlyPayment.toFixed(2).toLocaleString()}</p>
                                </div>                                        
                            )}
                                      
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function HouseCard(props) {
    const house = props.houseObj;
    const setSelectedHouseFunction = props.setSelectedHouse
    return (
        <div className="property-card" onClick={() => setSelectedHouseFunction(house)}>
            <img src={house.img?.[0]} alt={house.address} />
            <div className="price-row">
                <p className="house-price">${house.price.toLocaleString()}</p>
                <span className="material-symbols-outlined favorite">favorite</span>
            </div>
            <p className="house-address">{house.address}</p>
            <p className="house-details"><span className="material-symbols-outlined bed">bed</span>{house.beds} beds <span className="material-symbols-outlined bathtub">bathtub</span>{house.baths} Bathrooms <span className="material-symbols-outlined square-foot">square_foot</span>{house.sqft}</p>
        </div>
    );
}
