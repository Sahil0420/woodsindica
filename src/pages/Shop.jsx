// Shop.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet";
import { Container, Row } from "reactstrap";
import "../styles/shop.css";
import ProductList from "../components/UI/ProductList";
import useGetData from "../customHooks/useGetData"; 

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Use the custom hook to fetch data
  const { data, loading } = useGetData("products"); 

  useEffect(() => {
    // Set initial data and filter data when it's available
    if (data) {
      setProductsData(data);
      setFilteredData(data);
    }
  }, [data]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      setFilteredData(productsData);
    } else {
      const filteredProducts = productsData.filter(
        (item) => item.category === filterValue
      );
      setFilteredData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;

    const searchedProducts = productsData.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(searchedProducts);
  };

  const sortByPrice = (e) => {
    const sortBy = e.target.value;
    let sortedProducts = [];
    if (sortBy.toLowerCase() === "lth") {
      sortedProducts = [...filteredData].sort((a, b) => a.price - b.price);
    }

    if (sortBy.toLowerCase() === "htl") {
      sortedProducts = [...filteredData].sort((a, b) => b.price - a.price);
    }
    setFilteredData(sortedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products"></CommonSection>
      <section className="filters">
        <Container>
          <div className="filter_area">
            <div className="filter_widget" id="category">
              <select onChange={handleFilter}>
                <option value="all">Filter By Category</option>
                <option value="Furniture">Furniture</option>
                <option value="Timber">Timber</option>
                <option value="Essential Oils">Essential Oils</option>
              </select>
            </div>
            <div className="filter_widget" id="price">
              <select onChange={sortByPrice}>
                <option>Sort By Price</option>
                <option value="lth">Low To High</option>
                <option value="htl">High To Low</option>
              </select>
            </div>
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
          </div>
        </Container>
      </section>
      <section className="gallery">
        <Container>
          <Row>
            {loading ? (
              <h1 className="acknowledge">Loading products...</h1>
            ) : filteredData.length === 0 ? (
              <h1 className="acknowledge">No products</h1>
            ) : (
              <ProductList data={filteredData}></ProductList>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;