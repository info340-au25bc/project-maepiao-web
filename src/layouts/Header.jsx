
import React from "react";

export default function Header() {
	return (
		<nav>
			<div className="logo"><a href="/">HomeVest</a></div>
			<div className="nav-links">
				<a href="/">Buy</a>
				<a href="/sellpage.html">Sell</a>
				<a href="/manageproperty.html">Manage Property</a>
			</div>
			<div className="auth-links">
				<a href="/accountpage.html">
					<button className="login">Login</button>
				</a>
				<a href="/accountpage.html">
					<button className="signup">Signup</button>
				</a>
			</div>
		</nav>
	);
}
