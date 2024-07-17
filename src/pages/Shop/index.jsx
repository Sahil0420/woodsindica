import { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import ProductList from '../../components/UI/ProductList'
import useGetData from "../../customHooks/useGetData"; 
import "./style.css";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading } = useGetData("products");

  useEffect(() => {
    if (data) {
      setProductsData(data);
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [activeCategory, sortOption, searchTerm]);

  const applyFilters = () => {
    let filtered = [...productsData];

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Helmet title="Shop">
      <section className="shop_header">
        <Container>
          <h1>Our Products</h1>
          <p>Discover quality timber, furniture, and essential oils</p>
        </Container>
      </section>
      <section className="shop_content">
        <Container>
          <Row>
            <Col lg="3" md="4">
              <div className="shop_sidebar">
                <div className="sidebar_section">
                  <h3>Categories</h3>
                  <ul className="category_list">
                    {["All", "Furniture", "Timber", "Essential Oils"].map((category) => (
                      <li 
                        key={category} 
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar_section">
                  <h3>Sort By</h3>
                  <select onChange={handleSortChange} value={sortOption}>
                    <option value="">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </Col>
            <Col lg="9" md="8">
              <div className="shop_products">
                <div className="products_header">
                  <h2>{activeCategory === "All" ? "All Products" : activeCategory}</h2>
                  <div className="search_box">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <i className="ri-search-line"></i>
                  </div>
                </div>
                {loading ? (
                  <div className="loader">Loading products...</div>
                ) : filteredData.length === 0 ? (
                  <div className="no_products">No products found</div>
                ) : (
                  <ProductList data={filteredData} />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
    </Helmet>
  );
};

export default Shop;