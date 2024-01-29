import React, { useState, useEffect } from "react";
import { Axios } from "../../../Api/Axios.js";
import { Col, Row, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/HomePage.css";
import Spinner from "../../../Components/Global/Spinner.js";
export default function Test() {
  const [categories, setCategories] = useState([]);
  const [bestProducts, setBestProducts] = useState();
  const [isGet, setIsGet] = useState(false);
  const [query, setQuery] = useState("");

  // get categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `/webSite/categories?filter[item]=${query}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [query]);
  // get best products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/webSite/getBestProducts");
        setBestProducts(Object.values(response.data));
        setIsGet(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  // show
  const ShowBestProducts = (
    <Row className="mt-3">
      {isGet &&
        bestProducts.map((product, index) => (
          <Col key={index} xs={6} lg={3} md={4} sm={6}>
            <Link to={`/index/product/${product.id}`} className="card-link">
              <Card className="product-card">
                {product.images.length > 0 && (
                  <Card.Img
                    className="card-img"
                    variant="top"
                    src={product.images[0].image}
                    alt={product.title}
                  />
                )}
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text
                    style={{
                      visibility: product.discount > 0 ? "visible" : "hidden",
                    }}
                  >
                    Discount: {product.discount}%
                  </Card.Text>
                  <Link
                    to={`/index/product/${product.id}`}
                    className="cart-link"
                  >
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      style={{ cursor: "pointer" }}
                      className="text-primary fs-3 cart-icon"
                    />
                  </Link>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
    </Row>
  );
  const ShowCategories = categories.map((category, index) => (
    <Col lg={3} md={4} sm={6} xs={6} key={index}>
      <Link to={`/index/categoryProducts/${category.id}`}>
        <div className="card mb-2 shadow">
          <img
            src={category.image}
            alt={category.title}
            className="card-img-top img-fluid"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{category.title}</h5>
          </div>
        </div>
      </Link>
    </Col>
  ));
  const showSlideCategories = (
    <Row className="mb-5">
      <div className="carousel-container">
        <Carousel>
          {categories.map((category, index) => (
            <Carousel.Item key={index} className="carousel-item">
              <img
                className="d-block w-100 carousel-image"
                src={category.image}
                alt={category.title}
              />
              <Carousel.Caption>
                <h3>{category.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Row>
  );

  if (!isGet) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div
        className=" container mt-2"
        style={{ marginTop: "80px", marginBottom: "80px", minHeight: "100vh" }}
      >
        <header>
          <h1>Welcome to Our E-Commerce Store!</h1>
        </header>
        {showSlideCategories}
        <div className="categories-link categories-link">
          <Link to={"/index/categories"}>Categories</Link>
        </div>
        <div className="mt-2">
          <input
            type="text"
            className="form-control w-75 "
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Row style={{ marginTop: "40px" }}>{ShowCategories}</Row>

        <h5 className="title text-white mt-4">Best Products</h5>
        {isGet ? ShowBestProducts : ""}
      </div>
    </>
  );
}
