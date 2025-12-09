import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useUser();
	const active = ({ isActive }) => (isActive ? "active" : undefined);

	function toggleMenu() {
		setIsMenuOpen((prev) => !prev);
	}

	function closeMenu() {
		setIsMenuOpen(false);
	}

	async function handleSignOut() {
		await logout();
		closeMenu();
	}

	return (
		<header>
			<a href="#main" className="skip-link">
				Skip to main content
			</a>
			
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
					{user ? (
						<>
							<span className="user-name">{user.displayName || user.email}</span>
							<NavLink to="/account">
                				<button className="account">Account</button>
            				</NavLink>
							<button onClick={logout} className="account">Sign Out</button>
						</>
					) : (
						<>
							<NavLink to="/login"><button className="login">Log in</button></NavLink>
            				<NavLink to="/login?mode=signup"><button className="signup">Sign up</button></NavLink>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
