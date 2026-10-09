import { useNavigate } from "react-router-dom";
import { SignInIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { login } from "../api/authService";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      navigate("/home");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Cannot reach the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="leftside">
          <img src="/src/assets/login-img.jpg" alt="Login image" />
        </div>
        <div className="rightside">
          <h1>Welcome Back!</h1>
          <p className="pb-3">
            Please enter your credentials to access the system.
          </p>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              id="login"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              Login
              <SignInIcon size={28} className="ps-2" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
