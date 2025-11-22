import React from "react";
import "../styles/editpage.css";

export default function SellPage() {
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
                    <div className="flex-item1"><input className="long" type="text" placeholder="Enter an address, neighborhood, city, or ZIP code" /></div>
                    <div className="flex-item22">🔍</div>
                </div>

                <div className="house-info">
                    <div className="price-sell">
                        <div className="flex-item2"><h2>Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item"><input className="long-price" type="number" /></div>
                        </div>
                    </div>

                    <div className="bed-sell">
                        <div className="flex-item2"><h2>Beds</h2></div>
                        <div className="input">
                            <div className="flex-item"><input className="long-price" type="number" /></div>
                        </div>
                    </div>

                    <div className="bath-sell">
                        <div className="flex-item2"><h2>Bathrooms</h2></div>
                        <div className="input">
                            <div className="flex-item"><input className="long-price" type="number" /></div>
                        </div>
                    </div>

                    <div className="estimated-sell">
                        <div className="flex-item2"><h2>Estimated Price</h2></div>
                        <div className="input">
                            <div className="flex-item"><input disabled defaultValue={3000} className="long-price" type="number" placeholder="$0" /></div>
                        </div>
                    </div>
                </div>

                <div className="add-info">
                    <div className="add-section">
                        <button className="add-photo-button">Add New Photo</button>
                    </div>
                    <div className="photo1">
                        <img src="/images/house1.jpg" alt="house-1" />
                    </div>
                    <div className="photo2">
                        <img src="images/house2.jpeg" alt="house-2" />
                    </div>
                    <div className="photo3">
                        <img src="/images/house3.webp" alt="house-3" />
                    </div>
                    <div className="photo4">
                        <img src="/images/house4.jpg" alt="house-4" />
                    </div>
                    <div className="photo5">
                        <img src="/images/house5.jpg" alt="house-5" />
                    </div>
                </div>
            </section>
        </div>
    );
}
