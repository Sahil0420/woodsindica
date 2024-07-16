import React, { useState } from "react";
import Helmet from "../../components/Helmet";
import "./style.css";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import useAuth from '../../customHooks/useAuth'
const Checkout = () => {

  const {currentUser} = useAuth();
  const [name , setName ] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "", pin: "" });

  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.items);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };

  const validatePin = (pin) => {
    const regex = /^\d{6}$/;
    return regex.test(pin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", phone: "", pin: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!validatePhone(phone)) {
      newErrors.phone = "Invalid phone number";
      valid = false;
    }

    if (!validatePin(pin)) {
      newErrors.pin = "Invalid pincode";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const orderData = {
          name ,
          email,
          phone,
          pin,
          street,
          city,
          totalQty,
          totalAmount,
          cartItems,
          createdAt: new Date()
        };

        await addDoc(collection(db, "orders"), orderData);
        toast.success("Order placed successfully!");

        // Clear form after successful submission
        setEmail("");
        setPhone("");
        setPin("");
        setStreet("");
        setCity("");
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <Helmet title={"Checkout"}>
      <section className="checkout_form">
        <div className="card">
          <div className="leftside">
            <form onSubmit={handleSubmit}>
              <h1>CheckOut</h1>
              <input
                type="text"
                className="inputbox"
                name="name"
                placeholder="Customer Name"
                required
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
              <input
                type="email"
                className="inputbox"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                className="inputbox"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
              <input
                type="text"
                name="street"
                id="street"
                placeholder="Street Address"
                className="inputbox"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City / Town"
                className="inputbox"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                inputMode="numeric"
                id="pin"
                placeholder="Postal Code"
                className="inputbox"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
              {errors.pin && <span className="error">{errors.pin}</span>}
              <button type="submit" className="place_order_button">Place Order</button>
            </form>
          </div>
          <div className="rightside">
            <div>
              <h6>
                Total Qty : <span>{totalQty} item(s)</span>
              </h6>
              <h6>Payment Details</h6>
              <h6>
                Subtotal : <span>{totalAmount.toFixed(2)} INR</span>
              </h6>
              <h4>
                Total Cost : <span>{totalAmount.toFixed(2)} INR</span>
              </h4>

            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;
