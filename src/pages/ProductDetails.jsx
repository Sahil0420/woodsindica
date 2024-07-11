import React from "react";

import { useParams } from "react-router-dom";
import products from "../assets/data/product";
import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <Helmet>
        <CommonSection>
          <h1>Product Not Found</h1>
        </CommonSection>
      </Helmet>
    );
  }

  const { imgUrl, productName, price, avgRating, review, description } =
    product;

  return (
    <Helmet title={`${productName}`}>
      <CommonSection />
      <section className="product_area">
        <section className="product_image">
          <img src={imgUrl} alt="" />
        </section>
        <hr />
        <section className="productInfo">
          <div className="product_details">
            <h2>{productName}</h2>
            <div className="product_rating d-flex align-items-center gap-5 mb-3">
              <div>
                <span>
                  <i className="ri-star-s-fill"></i>
                </span>
                <span>
                  <i className="ri-star-s-fill"></i>
                </span>
                <span>
                  <i className="ri-star-s-fill"></i>
                </span>
                <span>
                  <i className="ri-star-s-fill"></i>
                </span>
                <span>
                  <i className="ri-star-half-s-fill"></i>
                </span>
              </div>
              <p>({avgRating} Rating)</p>
            </div>
            <span className="product_price"> &#8377; {price}</span>
            <p>{description}</p>
          </div>
        </section>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
