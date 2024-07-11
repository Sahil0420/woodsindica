import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "../../styles/product-card.css";
import { Col } from "reactstrap";
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
      })
    );

    toast.success('Added product card')

  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product_item">
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className="p-2 product_info">
          <h3 className="product_name">
            <Link to={`/shop/${item.slug}`}> {item.productName}</Link>
          </h3>
          <span className="text-center">{item.category}</span>
        </div>
        <div className="product_card-bottom d-flex align-items-start justify-content-between">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{scale : 1.2}} onClick={addToCart}>
            <button className="btn btn-ghost">Add to <i className="ri-shopping-cart-line"></i></button>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
