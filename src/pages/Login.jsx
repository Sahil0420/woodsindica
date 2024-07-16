import React, { useState } from "react";
import "../styles/login.css";
import Helmet from "../components/Helmet";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/forest.jpg";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";

const Login = () => {
  const [view, setView] = useState("password");
  const navigate = useNavigate();

  const togglePassword = () => {
    setView((view) => (view === "password" ? "text" : "password"));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      // Successful login
      setEmail("");
      setPassword("");
      setError("");
      setLoading(false); // Set loading to false
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
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Helmet title={"Login"}>
      <div className="login_form" style={{ backgroundImage: `url(${image})` }}>
        <form id="login-form" onSubmit={handleSubmit}>
          <h3>Login</h3>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={view}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.span
            className="eye_button"
            whileHover={{ color: "red" }}
            onClick={togglePassword}
          >
            {view === "password" ? (
              <i className="ri-eye-line"></i>
            ) : (
              <i className="ri-eye-close-line"></i>
            )}
          </motion.span>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <hr />
          <div className="redirect_section">
            <p>Don't have an account?</p>
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Login;