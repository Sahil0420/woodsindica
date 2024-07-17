import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { cartActions } from "../../redux/slices/cartSlice";
import useGetData from "../../customHooks/useGetData";
import Helmet from "../../components/Helmet";
import ProductCard from "../../components/UI/ProductCard";
import "./style.css";

import defaultImage from "../../assets/images/woods-home.webp";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products } = useGetData('products');

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No product found");
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (product) {
      dispatch(cartActions.addItem({
        id: product.id,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
      }));
      toast.success("Product added to cart");
    }
  };

  const relatedProducts = products
    .filter(item => item.category === product?.category && item.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const { imgUrl, productName, price, description, category } = product;

  return (
    <Helmet title={productName}>
      <div className="product-details-container">
        <div className="product-image-container">
          <img 
            src={imgUrl} 
            alt={productName} 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = defaultImage; 
            }} 
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-name">{productName}</h1>
          <span className="product-category">{category}</span>
          <p className="product-price">₹{price}</p>
          <p className="product-description">{description}</p>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="add-to-cart-btn" 
            onClick={addToCart}
          >
            🛒 Add to Cart
          </motion.button>
        </div>
      </div>

      <section className="related-products-section">
        <h2>You might also like</h2>
        <div className="related-products-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetails;