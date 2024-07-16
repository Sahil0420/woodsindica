import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/productDetails.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../customHooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id); // Correctly create the document reference
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() }); // Ensure to store the id as well
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

  const { data: products } = useGetData('products');

  useEffect(() => {
    console.log("Product:", product);
    console.log("Products:", products);
  }, [product, products]);

  const relatedProducts = products
    .filter(item => item.category === product?.category && item.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <Helmet title="Product Not Found">
        <CommonSection title="Product Not Found" />
        <section className="product-details">
          <h2>Product Not Found</h2>
        </section>
      </Helmet>
    );
  }

  const { imgUrl, productName, price, description } = product;

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="product-details">
        <div className="product-img">
          <img src={imgUrl} alt={productName} />
        </div>
        <div className="product-info">
          <h2>{productName}</h2>
          <p className="product-price">₹{price}</p>
          <p className="product-description">{description}</p>
          <motion.button whileHover={{ scale: 1.1 }} onClick={addToCart}>
            Add to Cart
          </motion.button>
        </div>
      </section>
      <section className="related-products">
        <h3>Related Products</h3>
        <div className="product-list">
          {relatedProducts.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-card-img">
                <img src={item.imgUrl} alt={item.productName} />
              </div>
              <div className="product-card-info">
                <Link to={`/shop/${item.id}`}>{item.productName}</Link>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
