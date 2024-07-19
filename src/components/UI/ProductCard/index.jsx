import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";
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
    <motion.div
      className="product_card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card_product_image">
        <img src={item.imgUrl} alt={item.productName} />
      </div>
      <div className="card_product_details">
        <h3 className="card_product_name">
          <Link to={`/shop/${item.id}`}>{item.productName}</Link>
        </h3>
        <p className="card_product_category">{item.category}</p>
      </div>
      <div className="card_product_price_cart">
        <span className="card_product_price">₹{item.price}</span>
        <motion.button
          className="card_product_button"
          onClick={addToCart}
          whileTap={{ scale: 0.9 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;