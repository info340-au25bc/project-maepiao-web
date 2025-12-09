import { useNavigate } from "react-router-dom";
import { getDatabase, ref as databaseRef, push } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import "../styles/editpage.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function SellPage() {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        address: "", 
        price: "", 
        beds: "", 
        baths: "", 
        sqft: "",
        estimated: "", 
        imgs: []
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    if (loading) {
        return(
            <div className="edit-property-page">
            <div className="loading-state" aria-live="polite">
                <ClipLoader />
                <p>Loading your account…</p>
            </div>
            </div>
        );
    }

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

        if (!user) {
            setError("You must be logged in to create a listing");
            setSaving(false);
            return;
        }

        if (!form.address.trim()) {
            setError("Please enter an address");
            setSaving(false);
            return;
        }

        try {
            const db = getDatabase();
            const housesRef = databaseRef(db, 'houses');

            const newHouseData = {
                address: form.address,
                price: form.price ? Number(form.price) : 0,
                beds: form.beds ? Number(form.beds) : 0,
                baths: form.baths ? Number(form.baths) : 0,
                sqft: form.sqft ? Number(form.sqft) : 0,
                img: form.imgs,
                userId: user.uid,
                createdAt: Date.now(),
            };

            await push(housesRef, newHouseData);
            
            // Navigate to manage page on success
            navigate("/manage");
        } catch (err) {
            console.error("Error creating listing:", err);
            setError("Failed to create listing. Please try again.");
            setSaving(false);
        }
    }

    return (
        <div className="edit-property-page">
            <header>
                <div className="container-sell">
                    <h1 className="h1-sell">Sell Your Home</h1>
                    <p className="lead-sell">Create a new listing for your property.</p>
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
                        {saving ? "Creating..." : "Create Listing"}
                    </button>
                </div>
            </section>
        </div>
    );
}
