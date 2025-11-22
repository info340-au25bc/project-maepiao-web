
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
	const active = ({ isActive }) => (isActive ? "active" : undefined);

	return (
		<nav>
			<div className="logo">
				<NavLink to="/" className={active}>HomeVest</NavLink>
			</div>

			<div className="nav-links">
				<NavLink to="/" className={active}>Buy</NavLink>
				<NavLink to="/sell" className={active}>Sell</NavLink>
				<NavLink to="/manage" className={active}>Manage Property</NavLink>
			</div>

			<div className="auth-links">
				<NavLink to="/account">
					<button className="login">Login</button>
				</NavLink>
				<NavLink to="/account">
					<button className="signup">Signup</button>
				</NavLink>
			</div>
		</nav>
	);
}
