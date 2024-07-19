// Shop.jsx
import { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { Container, Row, Col } from "reactstrap";
import ProductList from "../../components/UI/ProductList";
import useGetData from "../../customHooks/useGetData";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";
import shopHeroBg from '../../assets/images/forest1.png';

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data, loading } = useGetData("products");

  useEffect(() => {
    if (data) {
      setProductsData(data);
      setFilteredData(data);
      const maxPrice = Math.max(...data.map((item) => item.price));
      setPriceRange([0, maxPrice]);
    }
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [activeCategory, sortOption, searchTerm, priceRange]);

  const applyFilters = () => {
    let filtered = [...productsData];

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    filtered = filtered.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );

    if (sortOption === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsMobileFilterOpen(false);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <Helmet title="Shop">
      <section className="shop_header" style={{backgroundImage: `url(${shopHeroBg})`}}>
        <div className="shop_header_content">
          <h1>Our Products</h1>
          <p>Discover quality timber, furniture, and essential oils</p>
        </div>
      </section>
      <Container>
        <Row>
          <Col lg="3" md="4">
            <div className={`shop_filter_area ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
              <div className="filter_section">
                <h4>Categories</h4>
                <ul>
                  {["All", "Furniture", "Timber", "Essential Oils"].map(
                    (category) => (
                      <li
                        key={category}
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="filter_section">
                <h4>Price Range</h4>
                <RangeSlider
                  min={0}
                  max={Math.max(...productsData.map((item) => item.price))}
                  step={10}
                  value={priceRange}
                  onInput={setPriceRange}
                  className="price_slider"
                />
                <div className="price_range_display">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div className="filter_section">
                <h4>Sort By</h4>
                <select onChange={handleSortChange} value={sortOption}>
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </Col>
          <Col lg="9" md="8">
            <div className="shop_product_area">
              <div className="shop_top_bar">
                <h2>{activeCategory === "All" ? "All Products" : activeCategory}</h2>
                <div className="shop_search">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <i className="ri-search-line"></i>
                </div>
                <button className="mobile_filter_toggle" onClick={toggleMobileFilter}>
                  Filters
                </button>
              </div>
              <div className="shop_product_list">
                {loading ? (
                  <div className="loading">Loading products...</div>
                ) : filteredData.length === 0 ? (
                  <div className="no_products">No products found</div>
                ) : (
                  <ProductList data={filteredData} />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Shop;