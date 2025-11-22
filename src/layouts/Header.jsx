
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const active = ({ isActive }) => (isActive ? "active" : undefined);

	function toggleMenu() {
		setIsMenuOpen((prev) => !prev);
	}

	function closeMenu() {
		setIsMenuOpen(false);
	}
	return (
		<header>
			<nav aria-label="Primary site navigation" className={isMenuOpen ? "nav-open" : ""}>
				<div className="logo">
					<NavLink to="/" className={active} onClick={closeMenu}>HomeVest</NavLink>
				</div>
					<button className="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={toggleMenu} >☰</button>
				<div className="nav-links">
					<NavLink to="/" className={active}>Buy</NavLink>
					<NavLink to="/sell" className={active}>Sell</NavLink>
					<NavLink to="/manage" className={active}>Manage Property</NavLink>
				</div>

				<div className="auth-links">
					<NavLink to="/login">
						<button className="login">Login</button>
					</NavLink>
				</div>
			</nav>
		</header>
	);
}
