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
        imgs: ["data:image/png;base64,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"] 
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
