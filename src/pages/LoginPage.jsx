import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const email = event.target["login-email"].value;
    const password = event.target["login-password"].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/account");
    } catch (err) {
      console.error("Login error:", err);
      setError("Could not log in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const username = event.target["signup-username"].value;
    const email = event.target["signup-email"].value;
    const password = event.target["signup-password"].value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (username) {
        await updateProfile(cred.user, { displayName: username });
      }

      navigate("/account");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Could not create account. Please try again (password must be strong enough).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="login-header">
        <h1>Welcome to HomeVest</h1>
      </header>

      <main className="login-main">
        <div className="form-container">
          {error && <p className="error-text">{error}</p>}
          
          {mode === "login" && (
            <section className="form-box" aria-label="Login form">
              <h2>Login</h2>
              <form onsubmit={handleLogin}>
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
              <form onSubmit={handleSignup}>
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