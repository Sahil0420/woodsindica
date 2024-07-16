import React from "react";
import Helmet from "../components/Helmet";
import {Container, Row , Col} from 'reactstrap'
import './styles/dashboard.css'

import useGetData from '../customHooks/useGetData';


const Dashboard = () => {

  const {data : products} = useGetData('products');
  const {data : users} = useGetData('users');


  return <Helmet title="Admin Dashboard">
      <>
        <section>
          <Container>
            <Row>
              <Col className="lg-3">
                <div className="revenue_box">
                  <h5>Total Sales</h5>
                  <span>$7899</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="order_box">
                  <h5>Orders</h5>
                  <span>789</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="products_box">
                  <h5>Total Products</h5>
                  <span>{products.length}</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="user_box">
                  <h5>Total Users</h5>
                  <span>{users.length}</span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
  </Helmet>;
};

export default Dashboard;
