import React from "react";
import Helmet from "../../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../../components/UI/ProductCard"; // Adjust the import path as needed

import "./style.css";

const Home = () => {
  const year = new Date().getFullYear();
  
  // Sample featured products (replace with actual data)
  const featuredProducts = [
    { id: 1, productName: "Premium Oak Timber", imgUrl: "path_to_image", price: 9999, category: "Hardwood" },
    { id: 2, productName: "Eucalyptus Essential Oil", imgUrl: "path_to_image", price: 2499, category: "Essential Oils" },
    { id: 3, productName: "Cedarwood Planks", imgUrl: "path_to_image", price: 7999, category: "Softwood" },
  ];

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="hero_content">
                <p className="hero_subtitle">Trending products in {year}</p>
                <h2>Transform Your Living Space with Natural Elegance</h2>
                <p>
                  Elevate your home's aesthetic with <strong>WoodsIndica's</strong> premium timber and expertly
                  crafted furniture. Experience the perfect blend of functionality and contemporary elegance.
                </p>
                <motion.button whileTap={{ scale: 0.9 }} className="buy_btn">
                  <Link to={"/shop"}>Explore Our Collection</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="featured_products">
        <Container>
          <h2 className="text-center mb-5">Featured Products</h2>
          <Row>
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </Row>
          <div className="text-center mt-5">
            <motion.button whileTap={{ scale: 0.9 }} className="view_more_btn">
              <Link to="/shop">View All Products</Link>
            </motion.button>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;