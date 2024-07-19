// Login.jsx
import React, { useState } from "react";
import "./style.css";
import Helmet from "../../components/Helmet";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/forest.jpg";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const Login = () => {
  const [view, setView] = useState("password");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const togglePassword = () => {
    setView((view) => (view === "password" ? "text" : "password"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setEmail("");
      setPassword("");
      setError("");
      setLoading(false);
      navigate('/shop');
      toast.success(`Welcome back, ${user.displayName}`);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found. Please check your email address.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <div className="login-container" style={{ backgroundImage: `url(${image})` }}>
        <div className="login-form-wrapper">
          <form id="login-form" onSubmit={handleSubmit}>
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Please enter your details</p>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={view}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  className="toggle-password"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePassword}
                >
                  {view === "password" ? (
                    <i className="ri-eye-line"></i>
                  ) : (
                    <i className="ri-eye-off-line"></i>
                  )}
                </motion.button>
              </div>
            </div>
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </motion.button>
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;