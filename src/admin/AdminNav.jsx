import React from "react";
import { Row } from "reactstrap";

import useAuth from "../customHooks/useAuth";
import "./styles/adminNav.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    display: "All Products",
    path: "/dashboard/all-product",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Add Product",
    path: "/dashboard/add-product",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  

  return (
    <>
      <header className="admin_header">
        <div className="admin_nav_top">
          <div className="admin_nav_wrapper_top">
            <h2>WoodsIndica</h2>
          </div>
          <div className="search_box">
            <input type="text" name="" placeholder="Search..." id="" />
            <span>
              <i className="ri-search-line"></i>
            </span>
          </div>
          <div className="admin_nav_top_right">
            <span>
              <i className="ri-notification-3-line"></i>
            </span>
            <span>
              <i className="ri-settings-2-line"></i>                                
            </span>
            <img src={currentUser.photoURL} alt="userimg" />
          </div>
        </div>
      </header>
      <section className="admin_menu p-0 m-0">
        <Row>
          <div className="admin_navigation">
            <ul className="admin_menu_list">
              {admin_nav.map((item, index) => (
                <li className="admin_menu_item" id={index}>
                  <Link to={item.path} className={navClass => navClass.isActive ? 'active_admin_menu' : ''} >{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </section>
    </>
  );
};

export default AdminNav;
