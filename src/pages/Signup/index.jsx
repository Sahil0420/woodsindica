import React, { useState } from "react";
import Helmet from "../../components/Helmet";
import image from "../../assets/images/forest.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase.config"; // Import db
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const Signup = () => {
  const [view, setView] = useState("password");

  const navigate = useNavigate();

  const togglePassword = () => {
    setView((view) => (view === "password" ? "text" : "password"));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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

    setLoading(true); // Set loading to true

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);

      await updateProfile(user, {
        displayName: name,
      });
      console.log("Profile updated");

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: email,
      });
      console.log("User data stored in Firestore");

      // Successful signup
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setLoading(false); 
      navigate("/shop");
      toast.success(`${name} your account has been created`);
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
    <Helmet title={"Signup"}>
      <div className="signup_form" style={{ backgroundImage: `url(${image})` }}>
        <form id="signup-form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength="50"
            required
          />
          <input
            type={view}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          <input
            type={view}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
            {isLoading ? "Creating Account..." : "Create an Account"}
          </button>
          <hr />
          <div className="redirect_section">
            <p>Already have an account?</p>
            <span>
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Signup;

//T1mb3r_Utt@r@khand2024!