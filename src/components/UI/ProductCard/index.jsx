import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice"; // Adjusted path for Redux slice

import "./style.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success("Product added to cart!");
  };

  return (
    <div className="product_card">
      <div className="card_product_image">
        <motion.img
          whileHover={{ scale: 0.9 }}
          src={item.imgUrl}
          alt={item.productName}
        />
      </div>
      <div className="card_product_details">
        <h3 className="card_product_name">
          <Link to={`/shop/${item.id}`}> {item.productName}</Link>
        </h3>
        <span className="card_product_category">{item.category}</span>
      </div>
      <div className="card_product_cart">
        <span className="card_product_price">₹{item.price}</span>
        <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
          <button className="card_product_button">
            Add to <i className="ri-shopping-cart-line"></i>
          </button>
        </motion.span>
      </div>
    </div>
  );
};

export default ProductCard;
