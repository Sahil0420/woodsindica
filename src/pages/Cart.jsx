import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <Helmet title="Cart">
      <section className="cart">
        <section className="header">
          <h1>Your Cart</h1>
        </section>
        <section className="cart_items">
          {cartItems.length === 0 ? (
            <h2>Your Cart is Empty</h2>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} /> 
              ))}
              <section className="amount_section">
                <h3>
                  Subtotal : <span>₹ {totalAmount}</span>
                </h3>
                <div>
                  <p>Taxes and Shipping will be calculated in checkout.</p>
                </div>
                <div>
                  <button>
                    <Link to="/shop">Continue Shopping</Link>
                  </button>
                  <button>
                    <Link to="/checkout">Proceed to Checkout </Link>
                  </button>
                </div>
              </section>
            </>
          )}
        </section>
      </section>
    </Helmet>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  const decreaseUnits = () => {
    dispatch(cartActions.decreaseUnits(item.id));
  };

  const increaseUnits = () => {
    dispatch(cartActions.increaseUnits(item.id));
  };

  return (
    <div className="cart_item" key={item.id}>
      <div className="item_image">
        <img src={item.imgUrl} alt="" />
      </div>
      <div className="item_info">
        <h5>{item.productName}</h5>
        <p>{``}</p>
      </div>
      <div className="item_quantity">
        <button onClick={decreaseUnits} className="btn btn-danger">-</button>
        <input
          type="text"
          inputMode="numeric"
          name=""
          id="itemQty"
          value={item.quantity}
          readOnly
        />
        <button onClick={increaseUnits} className=" btn btn-primary">+</button>
        <div></div>
        <p>₹ {item.quantity * item.price}</p> {/* Use Rupee symbol */}
      </div>
      <motion.div whileHover={{ scale: 1.1 }} className="item_remove">
        <i className="ri-delete-bin-fill" onClick={deleteProduct}></i>
      </motion.div>
    </div>
  );
};

export default Cart;