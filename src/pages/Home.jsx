import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Services from "../services/Services";
import products from "../assets/data/product";
import { motion } from "framer-motion";

import heroimg from "../assets/images/wood.jpg";
import ProductList from "../components/UI/ProductList";


import "../styles/home.css";

const Home = () => {
  const [dataTimber, setDataTimber] = useState(products);
  const [dataOils, setDataOils] = useState(products)

  const year = new Date().getFullYear();

  useEffect(() => {
    const TimberProduct = products.filter((item) => item.category === "Timber");
    setDataTimber(TimberProduct);
    
    const OilProduct = products.filter((item) => item.category === "Essential Oils");
    setDataOils(OilProduct);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="hero_content">
                <p className="hero_subtitle">Trending products in {year}</p>
                <h2>
                  Transform Your living space with a sleek , mordern and
                  minimalist design
                </h2>
                <p>
                  "Elevate your home's aesthetic with{" "}
                  <strong>WoodsIndica's</strong> premium Timber and expertly
                  crafted Furniture , designed to blend functionality with
                  contemporary elegance".
                </p>
                <motion.button whileTap={{scale:0.9}} className="buy_btn">
                  <Link to={"/shop"}>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="hero_img">
                <img src={heroimg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="services">
        <Services />
      </section>
      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Timber Products</h2>
            </Col>
            <ProductList data={dataTimber} />
          </Row>
        </Container>
      </section>
      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Essential Oils</h2>
            </Col>
            <ProductList data={dataOils} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
