import React, { useEffect, useState } from "react";
import "../styles/editpage.css";

export default function SellPage() {
    const [house, setHouse] = useState(null);
    const [form, setForm] = useState({ address: "", price: "", beds: "", baths: "", estimated: "", imgs: [] });

    useEffect(() => {
        fetch("/temp-house-objects/sell-house-object.json")
            .then((res) => res.json())
            .then((data) => {
                setHouse(data);
                setForm({
                    address: data.address || "",
                    price: data.price || "",
                    beds: data.beds || "",
                    baths: data.baths || "",
                    estimated: data.price || "",
                    imgs: data.imgs || [],
                });
            })
            .catch((err) => console.error("Error loading sell object:", err));
    }, []);

    if (!house) return <div className="sell-page">Loading…</div>;

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
                    <div className="flex-item1"><input className="long" type="text" placeholder="Enter an address, neighborhood, city, or ZIP code" defaultValue={form.address} /></div>
                    <div className="flex-item22">🔍</div>
                </div>

                <div className="house-info">
                    <div className="price-sell">
                        <div className="flex-item2"><h2>Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item"><input className="long-price" type="number" defaultValue={form.price} /></div>
                        </div>
                    </div>

                    <div className="bed-sell">
                        <div className="flex-item2"><h2>Beds</h2></div>
                        <div className="input">
                            <div className="flex-item"><input className="long-price" type="number" defaultValue={form.beds} /></div>
                        </div>
                    </div>

                    <div className="bath-sell">
                        <div className="flex-item2"><h2>Bathrooms</h2></div>
                        <div className="input">
                            <div className="flex-item"><input className="long-price" type="number" defaultValue={form.baths} /></div>
                        </div>
                    </div>

                    <div className="estimated-sell">
                        <div className="flex-item2"><h2>Estimated Price</h2></div>
                        <div className="input">
                            <div className="flex-item"><input disabled defaultValue={form.estimated} className="long-price" type="number" placeholder="$0" /></div>
                        </div>
                    </div>
                </div>

                <div className="add-info">
                    <div className="add-section">
                        <button className="add-photo-button">Add New Photo</button>
                    </div>
                    {form.imgs && form.imgs.map((img, idx) => (
                        <div className={`photo${idx + 1}`} key={idx}>
                            <img src={img.path} alt={img.description || `photo-${idx}`} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
