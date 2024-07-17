import React, { useState } from "react";
import Helmet from "../../components/Helmet";
import "./style.css";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import useAuth from '../../customHooks/useAuth'
import { FaTree, FaLeaf, FaTruck, FaCreditCard } from 'react-icons/fa';


const Checkout = () => {
  const {currentUser} = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "", pin: "" });

  const totalQty = useSelector((state) => state.cart?.totalQuantity || 0);
  const totalAmount = useSelector((state) => state.cart?.totalAmount || 0);
  const cartItems = useSelector((state) => state.cart?.items || []);


  const handleSubmit = async (e) => {
    // handleSubmit function remains the same
  };

  return (
    <Helmet title={"Checkout"}>
      <section className="checkout_form">
        <div className="card">
          <div className="leftside">
            <h2><FaTree className="icon" /> Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="inputbox"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="inputbox"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  className="inputbox"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="inputbox"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City / Town</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="inputbox"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="pin">Postal Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="pin"
                  className="inputbox"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                {errors.pin && <span className="error">{errors.pin}</span>}
              </div>
              <button type="submit" className="place_order_button">
                <FaLeaf className="icon" /> Place Order
              </button>
            </form>
            </div>
          <div className="rightside">
            <h3>Order Summary</h3>
            <div className="order-details">
              <p><FaTruck className="icon" /> Shipping: <span>FREE</span></p>
              <p><FaCreditCard className="icon" /> Total: <span>{totalAmount.toFixed(2)} INR</span></p>
            </div>
            <div className="order-items">
              <h4>Your Items ({totalQty})</h4>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <span>{item.productName}</span>
                      <span>x {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} INR</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in cart</p>
              )}
            </div>
            <button type="submit" className="place_order_button">
              <FaLeaf className="icon" /> Place Order
            </button>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;
