import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/editpage.css";

export default function SellPage() {
    const location = useLocation();
    const houseFromState = location.state?.house;
    
    const [form, setForm] = useState({ 
        address: "", 
        price: "", 
        beds: "", 
        baths: "", 
        sqft: "",
        estimated: "", 
        imgs: []
    });

    useEffect(() => {
        if (houseFromState) {
            setForm({
                address: houseFromState.address || "",
                price: houseFromState.price || "",
                beds: houseFromState.beds || "",
                baths: houseFromState.baths || "",
                sqft: houseFromState.sqft || "",
                estimated: houseFromState.price || "",
                imgs: houseFromState.img || [],
            });
        }
    }, [houseFromState]);

    function updateField(field, value) {
        setForm((f) => {
            const updated = { ...f, [field]: value };
            // Update estimated price when price changes
            if (field === 'price') {
                updated.estimated = value;
            }
            return updated;
        });
    }

    return (
        <div className="sell-page">
            <header>
                <div className="container-sell">
                    <h1 className="h1-sell">Sell Your Home</h1>
                    <p className="lead-sell">Simple and safe selling for your home.</p>
                </div>
            </header>

            <section className="body-manage">
                <div className="enter-search">
                    <div className="flex-item1">
                        <input 
                            className="long" 
                            type="text" 
                            placeholder="Enter an address, neighborhood, city, or ZIP code"
                            value={form.address}
                            onChange={(e) => updateField("address", e.target.value)}
                        />
                    </div>
                    <div className="flex-item22">🔍</div>
                </div>

                <div className="house-info">
                    <div className="price-sell">
                        <div className="flex-item2"><h2>Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    value={form.price}
                                    onChange={(e) => updateField("price", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bed-sell">
                        <div className="flex-item2"><h2>Beds</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    value={form.beds}
                                    onChange={(e) => updateField("beds", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bath-sell">
                        <div className="flex-item2"><h2>Bathrooms</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    value={form.baths}
                                    onChange={(e) => updateField("baths", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="estimated-sell">
                        <div className="flex-item2"><h2>Estimated Price</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    disabled 
                                    value={form.estimated} 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="$0" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="add-info">
                    <div className="add-section">
                        <button className="add-photo-button">Add New Photo</button>
                    </div>
                    {form.imgs && form.imgs.map((img, idx) => (
                        <div className={`photo${idx + 1}`} key={idx}>
                            <img 
                                src={typeof img === 'string' ? img : img.path} 
                                alt={typeof img === 'string' ? `photo-${idx}` : (img.description || `photo-${idx}`)} 
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
