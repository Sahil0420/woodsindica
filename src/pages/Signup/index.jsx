// Signup.jsx
import React, { useState } from "react";
import Helmet from "../../components/Helmet";
import image from "../../assets/images/forest.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { generateJWTToken } from "../../utils/jwtUtils";

const Signup = () => {
  const [view, setView] = useState("password");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const togglePassword = () => {
    setView((view) => (view === "password" ? "text" : "password"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (name.length > 50 || email.length > 50) {
      setError("Name and email must be less than 50 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const token = generateJWTToken(user, process.env.JWT_SECRET_KEY);
      localStorage.setItem('token', token);

      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), { displayName: name, email: email });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setLoading(false);
      navigate("/shop");
      toast.success(`${name}, your account has been created`);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please try a different email.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  return (
    <Helmet title="Sign Up">
      <div className="signup-container" style={{ backgroundImage: `url(${image})` }}>
        <div className="signup-form-wrapper">
          <form id="signup-form" onSubmit={handleSubmit}>
            <h2>Create an Account</h2>
            <p className="signup-subtitle">Join us and start exploring</p>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                maxLength="50"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                maxLength="50"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={view}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
              className="signup-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </motion.button>
            <p className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </Helmet>
  );
};

export default Signup;