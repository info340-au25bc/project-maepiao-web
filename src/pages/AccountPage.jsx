import React from "react";

export default function AccountPage() {
    return (
        <main id="main" className="account-container">
        {/* Profile section */}
        <section className="card profile-card">
            <div className="profile-meta">
            <h1 id="profile-heading">Profile</h1>
            <p className="profile-name">Josh Hong</p>
            <p className="profile-email">jh26@example.com</p>
            <div className="button-row">
                <a className="button" href="#edit-profile">
                Edit Profile
                </a>
                <button className="button button-secondary" type="button">
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
            <ul className="saved-list" role="list">
            <li className="saved-item">
                <a className="saved-thumb" href="#">
                <img
                    src="/images/house1.jpg"
                    alt="2699 Green Valley, Highland Lake, FL"
                />
                </a>
                <div className="saved-meta">
                <a className="saved-title" href="#">
                    2699 Green Valley, Highland Lake, FL
                </a>
                <p className="saved-sub">$729,000 · 3 beds · 2 baths</p>
                </div>
                <button className="button button-tertiary" type="button">
                Remove
                </button>
            </li>

            <li className="saved-item">
                <a className="saved-thumb" href="#">
                <img src="/images/house2.jpeg" alt="2102 Maple St, Seattle, WA" />
                </a>
                <div className="saved-meta">
                <a className="saved-title" href="#">
                    2102 Maple St, Seattle, WA
                </a>
                <p className="saved-sub">$815,000 · 4 beds · 2.5 baths</p>
                </div>
                <button className="button button-tertiary" type="button">
                Remove
                </button>
            </li>
            </ul>
        </section>
        </main>
    );
}