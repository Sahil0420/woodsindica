import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Services from "../services/Services";
import products from "../assets/data/product";
import { motion } from "framer-motion";

import heroimg from "../assets/images/wood.jpg";
import ProductList from "../components/UI/ProductList";

import useGetData from "../customHooks/useGetData";

import "../styles/home.css";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const [dataTimber, setDataTimber] = useState(products);
  const [dataOils, setDataOils] = useState(products);

  const year = new Date().getFullYear();
  
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
                <motion.button whileTap={{ scale: 0.9 }} className="buy_btn">
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
      <section>

      </section>
    </Helmet>
  );
};

export default Home;
