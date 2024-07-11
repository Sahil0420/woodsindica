import React from "react";
import "./style.css";
import logo from "../../assets/images/drawing.svg";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-3">
            <div className="logo">
              <img src={logo} alt="WoodsIndica" />
              <div>
                <h4>Woods Indica</h4>
              </div>
            </div>

            <p className="footer_text mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
              delectus ab magni quas earum pariatur dolorem quo ullam quibusdam
              distinctio maxime doloremque tempora adipisci vitae voluptatum
              reprehenderit provident praesentium libero.
            </p>
          </Col>
          <Col lg="3" md="4" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Timber</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Furniture</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Essential-oils</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md='4' className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/shop"}>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/cart"}>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/login"}>Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Contact</h4>
              <ListGroup className="footer_contact">
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span>
                    <i className="ri-map-pin-line" />
                  </span>
                  <p>420 Saarti Fatoh , Bilaspur , Himachal , India</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+914204204200</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>woodsindica@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12" className="mb-4">
            <p className="footer_copyright">
              Copyright {year} Developed by Sikander. All right reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
