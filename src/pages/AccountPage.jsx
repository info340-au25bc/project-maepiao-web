import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { getDatabase, ref as databaseRef, onValue, remove } from 'firebase/database';

export default function AccountPage() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const [savedHomes, setSavedHomes] = useState([]);

    const handleRemoveSaved = async (id) => {
        try {
            const db = getDatabase();
            const favRef = databaseRef(db, `userFavorites/${user.uid}/${id}`);
            await remove(favRef);            
        } catch (error) {
            console.error("Error removing saved home:", error);
        }

    }

    if(!user){
        return (
            <main className="account-container">
                <section className="card">
                <h1>Account</h1>
                <p>You need to be logged in to view this page.</p>
                <Link className="button" to="/login">
                    Go to Login
                </Link>
                </section>
            </main>
        );
    }

    const displayName = user.displayName || user.email || "HomeVest user";
    const email = user.email || "";

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    }

    useEffect(() => {
        const db = getDatabase();
        const favRef = databaseRef(db, `userFavorites/${user.uid}`);

        const unsubscribe = onValue(favRef, (snapshot) => {
            const data = snapshot.val() || {};
            const homesArray = Object.entries(data).map(([id, value])=> ({
                id,
                ...value,
            }));
            setSavedHomes(homesArray);
        });

        return unsubscribe;
    }, [user.uid]);

    return (
        <main id="main" className="account-container">
        {/* Profile section */}
        <section className="card profile-card">
            <div className="profile-meta">
            <h1 id="profile-heading">Profile</h1>
            <p className="profile-name">{displayName}</p>
            <p className="profile-email">{email}</p>
            <div className="button-row">
                <a className="button" href="#edit-profile">
                Edit Profile
                </a>
                <button className="button button-secondary" type="button" onClick={handleLogout}>
                Log Out
                </button>
            </div>
            </div>
        </section>

        {/* Password & security */}
        <section className="card" aria-labelledby="security-heading" id="edit-profile">
            <h2 id="security-heading">Password &amp; security</h2>
            <form action="#" method="post" className="form">
            <fieldset>
                <legend className="legend">
                <strong>Change password</strong>
                </legend>

                <div className="form-row">
                <label htmlFor="current-password">Current password</label>
                <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
                </div>

                <div className="form-row">
                <label htmlFor="new-password">New password</label>
                <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    aria-describedby="pw-hint"
                    required
                />
                <small id="pw-hint" className="hint">
                    Use 8+ characters with a mix of letters and numbers.
                </small>
                </div>

                <div className="form-row">
                <label htmlFor="confirm-password">Confirm new password</label>
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                />
                </div>
            </fieldset>

            <div className="form-actions">
                <button className="button" type="submit">
                Update password
                </button>
            </div>
            </form>
        </section>

        {/* Notifications */}
        <section className="card settings-card" aria-labelledby="notif-heading">
            <h2 id="notif-heading">Notifications</h2>
            <form action="#" method="post" className="form">
            <fieldset>
                <legend className="legend">
                <strong>Email preferences</strong>
                </legend>

                <div className="check-row">
                <input
                    type="checkbox"
                    id="notif-saved"
                    name="notif-saved"
                    defaultChecked
                />
                <label htmlFor="notif-saved">Updates about saved homes</label>
                </div>

                <div className="check-row">
                <input type="checkbox" id="notif-tours" name="notif-tours" />
                <label htmlFor="notif-tours">Tour reminders</label>
                </div>

                <div className="check-row">
                <input
                    type="checkbox"
                    id="notif-research"
                    name="notif-research"
                />
                <label htmlFor="notif-research">Market research &amp; surveys</label>
                </div>
            </fieldset>

            <div className="form-actions">
                <button className="button" type="submit">
                Save preferences
                </button>
            </div>
            </form>
        </section>

        {/* Saved homes */}
        <section className="card" aria-labelledby="saved-heading">
            <h2 id="saved-heading">Saved homes</h2>

            {savedHomes.length === 0 ? (
                <p>You don't have any saved homes yet.</p>
            ) : (
                <ul className="saved-list" role="list">
                    {savedHomes.map((home) => (
                        <li className="saved-item" key={home.id}>
                            <a className="saved-thumb" href="#">
                            <img
                                src={home.img?.[0]}
                                alt={home.address}
                            />
                            </a>
                            <div className="saved-meta">
                            <a className="saved-title" href="#">
                                {home.address}
                            </a>
                            <p className="saved-sub">${home.price?.toLocaleString()} · {home.beds} beds · {home.baths} baths</p>
                            </div>
                            <button className="button button-tertiary" type="button" onClick={() => handleRemoveSaved(home.id)}>
                            Remove
                            </button>
                        </li>                        
                    ))}
                </ul>
            )}
        </section>
        </main>
    );
}