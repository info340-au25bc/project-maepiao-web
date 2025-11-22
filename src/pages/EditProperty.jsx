import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/editpage.css";

export default function EditProperty() {
    const [house, setHouse] = useState(null);
    const [form, setForm] = useState({ price: "", beds: "", baths: "", estimated: "", imgs: [] });

    useEffect(() => {
        fetch("/temp-house-objects/sell-house-object.json")
            .then((res) => res.json())
            .then((data) => {
                setHouse(data);
                setForm({
                    price: data.price || "",
                    beds: data.beds || "",
                    baths: data.baths || "",
                    estimated: data.price || "",
                    imgs: data.imgs || [],
                });
            })
            .catch((err) => console.error("Error loading house: ", err));
    }, []);

    function updateField(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    if (!house) return <div className="edit-property-page">Loading…</div>;

    return (
        <div className="edit-property-page">
            <header>
                <div className="container-sell">
                    <h1 className="h1-sell">Edit Your Property</h1>
                    <p className="lead-sell">Edit your listing here.</p>
                </div>
            </header>

            <section className="body-manage">
                <div className="house-info">
                    <div className="price-sell">
                        <div className="flex-item2"><h2>Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item">
                                <input value={form.price} onChange={(e) => updateField("price", e.target.value)} className="long-price" type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="bed-sell">
                        <div className="flex-item2"><h2>Beds</h2></div>
                        <div className="input">
                            <div className="flex-item"><input value={form.beds} onChange={(e) => updateField("beds", e.target.value)} className="long-price" type="number" /></div>
                        </div>
                    </div>

                    <div className="bath-sell">
                        <div className="flex-item2"><h2>Bathrooms</h2></div>
                        <div className="input">
                            <div className="flex-item"><input value={form.baths} onChange={(e) => updateField("baths", e.target.value)} className="long-price" type="number" /></div>
                        </div>
                    </div>

                    <div className="estimated-sell">
                        <div className="flex-item2"><h2>Estimated Price</h2></div>
                        <div className="input">
                            <div className="flex-item"><input value={form.estimated} disabled className="long-price" type="number" placeholder="$0" /></div>
                        </div>
                    </div>
                </div>

                <div className="add-info">
                    <div className="add-section">
                        <button className="add-photo-button">Add New Photo</button>
                    </div>
                    {form.imgs && form.imgs.slice(0, 5).map((img, idx) => (
                        <div className={`photo${idx + 1}`} key={idx}>
                            <img src={img.path} alt={img.description || `photo-${idx}`} />
                        </div>
                    ))}
                </div>
            <Link to="/manage">
                <div className="save-row">
                    <button className="edit-property-button">Save</button>
                </div>
            </Link>
            </section>
        </div>
    );
}
