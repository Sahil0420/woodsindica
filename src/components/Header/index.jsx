import React, { useRef, useEffect } from "react";
import "./style.css";
import logo from "../../assets/images/drawing.svg";
import { Container, Row } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user.svg";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../customHooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const headerRef = useRef(null);

  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const navigateToCart = () => navigate("/cart");

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  const toggleProfileAction = () =>
    profileActionRef.current.classList.toggle("hideprofile");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="WoodsIndica" />
              <div>
                <h4>Woods Indica</h4>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item) => (
                  <li className="nav_item">
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="cart_icon"
                onClick={navigateToCart}
              >
                <i className="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </motion.span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : { userIcon }}
                  alt=""
                  onClick={toggleProfileAction}
                />
                <div
                  className="profile_actions hideprofile"
                  ref={profileActionRef}
                  onClick={toggleProfileAction}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Link to="/signup">Sign Up</Link>
                      <Link to="/login">Log In</Link>
                      {/* <Link to="/dashboard">Dashboard</Link> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
