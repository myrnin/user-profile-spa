// Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/localStorageUtil"; // Assumed utility functions for local storage

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error message after a few seconds
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = validateLogin(email, password);
    if (user) {
      navigate("/view-profile", { state: { email: user.email } }); // Pass the user's email to ViewProfile component
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div style={{ width: 500, margin: "auto" }}>
        <button onClick={() => navigate("/create-profile")}>
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default Login;
