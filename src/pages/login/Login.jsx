import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  // Predefined admin credentials
  const adminUsername = "admin123";
  const adminPassword = "admin@pass";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      // Navigate to dashboard if credentials match
      navigate("/dashboard");
    } else {
      // Show error if they don't match
      setError("Invalid Admin Username or Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        position: "absolute",
        marginTop: "-200px",

        width: "100%",
        padding: "100px",
      }}
      className="mainlogin"
    >
      <div className="login-form">
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} >
          <div>
            <label>Admin Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter Admin Name"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Admin Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
