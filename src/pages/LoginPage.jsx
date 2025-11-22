import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <div>
      <header className="login-header">
        <h1>Welcome to HomeVest</h1>
      </header>

      <main className="login-main">
        <div className="form-container">
          {mode === "login" && (
            <section className="form-box" aria-label="Login form">
              <h2>Login</h2>
              <form>
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" placeholder="Enter your email" required/>

                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password" placeholder="Enter your password" required/>

                <button type="submit" className="btn"> Login </button>

                <p className="switch-text">
                  Don’t have an account?{" "}
                  <a href="#" onClick={(event) => {event.preventDefault(); setMode("signup");}}> Sign up here</a>
                </p>
              </form>
            </section>
          )}

          {mode === "signup" && (
            <section className="form-box" aria-label="Sign up form">
              <h2>Sign Up</h2>
              <form>
                <label htmlFor="signup-username">Username</label>
                <input type="text" id="signup-username" placeholder="Choose a username" required/>

                <label htmlFor="signup-email">Email</label>
                <input type="email" id="signup-email" placeholder="Enter your email" required />

                <label htmlFor="signup-password">Password</label>
                <input type="password" id="signup-password" placeholder="Create a password" required />

                <button type="submit" className="btn"> Create Account</button>

                <p className="switch-text">
                  Already have an account?{" "}
                  <a href="#" onClick={(event) => { event.preventDefault(); setMode("login");  }} > Login here </a>
                </p>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}