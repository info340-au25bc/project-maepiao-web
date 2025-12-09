import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref as databaseRef, get, update } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import "../styles/editpage.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function EditProperty() {
    const { houseId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const [house, setHouse] = useState(null);
    const [form, setForm] = useState({ 
        address: "",
        price: "", 
        beds: "", 
        baths: "", 
        sqft: "",
        estimated: "", 
        imgs: [] 
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!houseId || !user) return;

        const db = getDatabase();
        const houseRef = databaseRef(db, `houses/${houseId}`);
        
        get(houseRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Verify the house belongs to the current user
                    if (data.userId === user.uid) {
                        setHouse(data);
                        setForm({
                            address: data.address || "",
                            price: data.price || "",
                            beds: data.beds || "",
                            baths: data.baths || "",
                            sqft: data.sqft || "",
                            estimated: data.price || "",
                            imgs: data.img || [],
                        });
                    } else {
                        console.error("Unauthorized: This house does not belong to the current user");
                    }
                } else {
                    console.error("House not found");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading house: ", err);
                setLoading(false);
            });
    }, [houseId, user]);

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

    function handleAddPhotoClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setError(""); // Clear previous errors

        Array.from(files).forEach((file) => {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError(prev => prev ? `${prev}\n${file.name} is not an image file` : `${file.name} is not an image file`);
                return; // Skip this file but continue with others
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError(prev => prev ? `${prev}\n${file.name} is too large (max 5MB)` : `${file.name} is too large (max 5MB)`);
                return; // Skip this file but continue with others
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setForm((f) => ({
                    ...f,
                    imgs: [...(f.imgs || []), base64String]
                }));
            };
            reader.onerror = () => {
                setError(prev => prev ? `${prev}\nFailed to read ${file.name}` : `Failed to read ${file.name}`);
            };
            reader.readAsDataURL(file);
        });

        e.target.value = '';
    }

    function handleRemovePhoto(index) {
        setForm((f) => ({
            ...f,
            imgs: f.imgs.filter((_, i) => i !== index)
        }));
    }

    async function handleSave(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        if (!houseId || !user) {
            setError("Missing house ID or user information");
            setSaving(false);
            return;
        }

        try {
            const db = getDatabase();
            const houseRef = databaseRef(db, `houses/${houseId}`);

            const updateData = {
                address: form.address,
                price: form.price ? Number(form.price) : 0,
                beds: form.beds ? Number(form.beds) : 0,
                baths: form.baths ? Number(form.baths) : 0,
                sqft: form.sqft ? Number(form.sqft) : 0,
                img: form.imgs, // Keep the img array as is
            };

            await update(houseRef, updateData);
            
            // Navigate back to manage page on success
            navigate("/manage");
        } catch (err) {
            console.error("Error saving house:", err);
            setError("Failed to save changes. Please try again.");
            setSaving(false);
        }
    }

    if (loading || !house) {
        return (
            <div className="edit-property-page">
            <div className="loading-state" aria-live="polite">
                <ClipLoader />
                <p>Loading your listing…</p>
            </div>
            </div>
        );
    }

    return (
        <div className="edit-property-page">
            <header>
                <div className="container-sell">
                    <h1 className="h1-sell">Edit Your Property</h1>
                    <p className="lead-sell">Edit your listing here.</p>
                </div>
            </header>

            <section className="body-manage">
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', whiteSpace: 'pre-line' }}>
                        {error}
                    </div>
                )}
                
                {/* Address Row */}
                <div className="form-row full-width">
                    <div className="form-field">
                        <div className="flex-item2"><h2>Address</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="text" 
                                    placeholder="Enter address, neighborhood, city, or ZIP code"
                                    value={form.address}
                                    onChange={(e) => updateField("address", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price, Beds, SqFt, Baths Row */}
                <div className="form-row four-columns">
                    <div className="form-field">
                        <div className="flex-item2"><h2>Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="0"
                                    value={form.price}
                                    onChange={(e) => updateField("price", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="flex-item2"><h2>Beds</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="0"
                                    value={form.beds}
                                    onChange={(e) => updateField("beds", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="flex-item2"><h2>Square Feet</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="0"
                                    value={form.sqft}
                                    onChange={(e) => updateField("sqft", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="flex-item2"><h2>Bathrooms</h2></div>
                        <div className="input">
                            <div className="flex-item">
                                <input 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="0"
                                    value={form.baths}
                                    onChange={(e) => updateField("baths", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estimated Price Row */}
                <div className="form-row full-width">
                    <div className="form-field">
                        <div className="flex-item2"><h2>Estimated Price</h2></div>
                        <div className="input">
                            <div className="flex-item2">$</div>
                            <div className="flex-item">
                                <input 
                                    disabled 
                                    value={form.estimated} 
                                    className="long-price" 
                                    type="number" 
                                    placeholder="0" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="photo-grid">
                    <div className="add-section">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button 
                            type="button"
                            className="add-photo-button"
                            onClick={handleAddPhotoClick}
                        >
                            Add New Photo
                        </button>
                    </div>
                    {form.imgs && form.imgs.map((img, idx) => (
                        <div key={idx} className="photo-item">
                            <img 
                                src={typeof img === 'string' ? img : img.path} 
                                alt={typeof img === 'string' ? `photo-${idx}` : (img.description || `photo-${idx}`)} 
                                onError={(e) => {
                                    console.error('Image failed to load:', idx);
                                    e.target.style.display = 'none';
                                }}
                            />
                            <button
                                type="button"
                                className="photo-remove-btn"
                                onClick={() => handleRemovePhoto(idx)}
                                title="Remove image"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            <div className="save-row">
                <button 
                    className="edit-property-button" 
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
            </section>
        </div>
    );
}
