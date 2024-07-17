import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ProductCard from "../../components/UI/ProductCard";
import { FaLeaf, FaTree, FaOilCan, FaCouch } from "react-icons/fa";
import furniture4 from "../../assets/images/furniture4.jpg";
import furniture1 from "../../assets/images/furniture1.jpg";
import furniture2 from "../../assets/images/furniture2.jpg";
import furniture3 from "../../assets/images/furniture3.jpg";
import furniture5 from "../../assets/images/furniture5.jpg"
import { motion, AnimatePresence } from "framer-motion";

import "./style.css";

const Home = () => {
  const year = new Date().getFullYear();
  
  const featuredProducts = [
    { id: 1, productName: "Premium Oak Timber", imgUrl: "path_to_image", price: 9999, category: "Hardwood" },
    { id: 2, productName: "Eucalyptus Essential Oil", imgUrl: "path_to_image", price: 2499, category: "Essential Oils" },
    { id: 3, productName: "Cedarwood Planks", imgUrl: "path_to_image", price: 7999, category: "Softwood" },
    { id: 4, productName: "Lavender Essential Oil", imgUrl: "path_to_image", price: 1999, category: "Essential Oils" },
  ];

  const categories = [
    { name: "Hardwood", icon: <FaTree />, description: "Durable and elegant hardwood options" },
    { name: "Softwood", icon: <FaLeaf />, description: "Versatile softwood for various projects" },
    { name: "Essential Oils", icon: <FaOilCan />, description: "Nature's aromatic essences, bottled for you" },
    { name: "Custom Furniture", icon: <FaCouch />, description: "Bespoke furniture crafted to your specifications" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const furnitureImages = [furniture1, furniture2, furniture3, furniture4, furniture5];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % furnitureImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
  <Container>
    <Row className="align-items-center">
      <Col lg="6" md="12">
        <div className="hero_content">
          <h1 className="hero_title">Discover Nature's Finest</h1>
          <p className="hero_subtitle">Trending products in {year}</p>
          <h2 className="hero_tagline">Transform Your Living Space with Natural Elegance</h2>
          <p className="hero_description">
            Elevate your home's aesthetic with <strong>WoodsIndica's</strong> premium timber and expertly crafted furniture. 
            Experience the perfect blend of functionality and contemporary elegance.
          </p>
          <motion.button whileTap={{ scale: 0.9 }} className="buy_btn">
            <Link to={"/shop"}>Explore Our Collection</Link>
          </motion.button>
        </div>
      </Col>
    </Row>
  </Container>
</section>

      <section className="categories_section">
        <Container>
          <h2 className="text-center mb-5">Our Offerings</h2>
          <Row>
            {categories.map((category, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <div className="category_item">
                  <div className="category_icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="custom_furniture_section">
  <Container>
    <Row className="align-items-center">
      <Col md={6}>
        <div className="furniture-slideshow-container">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImageIndex}
              src={furnitureImages[currentImageIndex]}
              alt="Custom Furniture"
              className="img-fluid rounded furniture-slideshow"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </Col>
      <Col md={6}>
        <div className="custom_furniture_content">
          <h2>Custom Furniture Crafted Just for You</h2>
          <p>
            Bring your vision to life with our bespoke furniture service. Our expert craftsmen blend traditional 
            woodworking techniques with modern design to create unique pieces that perfectly fit your space and style.
          </p>
          <ul>
            <li>Personalized design consultation</li>
            <li>High-quality, sustainably sourced materials</li>
            <li>Skilled craftsmanship</li>
            <li>Perfect fit for your space</li>
          </ul>
          <motion.button whileTap={{ scale: 0.9 }} className="custom_order_btn">
            <Link to="/custom-order">Start Your Custom Order</Link>
          </motion.button>
        </div>
      </Col>
    </Row>
  </Container>
</section>
<section className="featured_products_section">
  <Container>
    <Row>
      <Col lg="12" className="text-center mb-5">
        <h2 className="section_title">Featured Products</h2>
      </Col>
    </Row>
    <Row>
      {/* Add your featured products here */}
      <Col lg="12" className="text-center mt-4">
        <motion.button whileTap={{ scale: 0.9 }} className="theme_btn">
          <Link to={"/shop"}>View All Products</Link>
        </motion.button>
      </Col>
    </Row>
  </Container>
</section>
      <section className="cta_section">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2>Ready to Transform Your Space?</h2>
              <p>Discover our wide range of premium woods, essential oils, and custom furniture options today.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <motion.button whileTap={{ scale: 0.9 }} className="cta_btn">
                <Link to="/shop">Shop Now</Link>
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;