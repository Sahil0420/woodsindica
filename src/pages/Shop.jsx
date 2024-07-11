import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";

import products from "../assets/data/product";
import ProductList from "../components/UI/ProductList";

const categories = ["timber", "essential oils", "furniture"];

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Timber") {
      const filterProducts = products.filter(
        (item) => item.category === "Timber"
      );
      setProductsData(filterProducts);
    }

    if (filterValue === "Furniture") {
      const filterProducts = products.filter(
        (item) => item.category === "Furniture"
      );
      setProductsData(filterProducts);
    }

    if (filterValue === "Essential Oils") {
      const filterProducts = products.filter(
        (item) => item.category === "Essential Oils"
      );
      setProductsData(filterProducts);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  const sortByPrice = (e) =>{
    const sortBy = e.target.value;
    if (sortBy.toLowerCase() === "ascending"){
      const sortProduct = products.sort((a ,b ) => (a.price - b.price))
    }

    if (sortBy.toLowerCase() === "descending"){
      const sortProduct = products.sort((a ,b ) => (b.price - a.price))
    }
  }

  return (
    <Helmet title="Shop">
      <CommonSection title="Products"></CommonSection>
      <section className="filters">
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Timber">Timber</option>
                  <option value="Essential Oils">Essential Oils</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter_widget">
                <select onChange={sortByPrice}>
                  <option>Sort By Price</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="3">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="search. . . . . ."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="gallery">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="acknowledge">No products</h1>
            ) : (
              <ProductList data={productsData}></ProductList>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
