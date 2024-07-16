// ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./style.css"; // Since `style.css` is in the same folder as `index.jsx`
import { Col } from "reactstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice"; // Adjusted path for Redux slice


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
    <Col lg="4" md="6" className="mb-2">
      <div className="product_item">
        <div className="product_img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt={item.productName}
          />
        </div>
        <div className="p-2 product_info">
          <h3 className="product_name">
            <Link to={`/shop/${item.id}`}> {item.productName}</Link>
          </h3>
          <span className="text-center">{item.category}</span>
        </div>
        <div className="product_card-bottom d-flex align-items-start justify-content-between">
          <span className="price">₹ {item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <button className="btn btn-ghost">
              Add to <i className="ri-shopping-cart-line"></i>
            </button>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;