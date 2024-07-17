import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import logo from '../../assets/images/drawing.svg'

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard/admin",
    icon : "ri-dashboard-line"
  },
  {
    display: "All Products",
    path: "/dashboard/all-product",
    icon : "ri-store-line"
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
    icon : "ri-shopping-bag-4-line"
  },
  {
    display: "Add Product",
    path: "/dashboard/add-product",
    icon : "ri-add-circle-line"
  },
];

const AdminNav = () => {
  return (
    <nav className="admin_navbar">
      <div className="admin_logo">
        <span className="admin_nav_logo"><img src={logo} alt=""/></span>
        <h2 >WoodsIndica</h2>
      </div>
      <div className="admin_link_bar">
        {admin_nav.map((item, index) => (
          <div key={index} className="admin_nav_link">
            <span><i className={item.icon}/></span>
          <Link to={item.path}>
            {item.display}
          </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default AdminNav;
