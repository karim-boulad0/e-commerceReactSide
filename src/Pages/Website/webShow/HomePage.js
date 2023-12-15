import React, { useState, useEffect } from "react";
import { Axios } from "../../../Api/Axios.js";
import { Col, Row, Carousel, Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import TopNavBar from "../../../Components/Website/webShow/TopBar.js";
import Footer from "../../../Components/Website/webShow/Footer.js";
export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [bestProducts, setBestProducts] = useState();
  const [isGet, setIsGet] = useState(false);
  // get categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/webSite/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
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
    <Row>
      {isGet &&
        bestProducts.map((product,index) => (
          <Col key={index} xs={12} lg={3} md={4} sm={6}>
            <NavLink to={`/NavBar/product/${product.id}`}>
              <Card>
                {product.images.length > 0 && (
                  <Card.Img
                    className="w-100 "
                    style={{ height: "200px" }}
                    variant="top"
                    src={product.images[0].image} // Displaying the first image
                    alt={product.title}
                  />
                )}
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>Discount: {product.discount}%</Card.Text>
                  {/* Add more details or customize as needed */}
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        ))}
    </Row>
  );
  const ShowSixCategories = categories.map((category,index) => (
    <Col lg={3} md={4} sm={7} key={index}>
      <Link to={`/NavBar/categoryProducts/${category.id}`}>

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
      <Carousel style={{ height: "400px" }}>
        {categories.map((category,index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={category.image}
              alt={category.title}
              style={{
                objectFit: "cover",
                height: "450px",
                width: "350px",
              }}
            />
            <Carousel.Caption>
              <h3>{category.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Row>
  );
  return (
    <>
      <TopNavBar />
      <div
        className="container "
        style={{ marginTop: "80px", marginBottom: "80px", minHeight: "100vh" }}
      >
        <h1>Welcome to Our E-Commerce Store!</h1>
        {showSlideCategories}
        <Row style={{ marginTop: "100px" }}>{ShowSixCategories}</Row>
        <div className="bg-black text-white w-100 p-3 text-center">
          <NavLink to={"/NavBar/categories"}> See All Categories</NavLink>
        </div>
      {isGet ? ShowBestProducts : ""}
      </div>

      <footer
        className="footer"
        style={{ padding: "10px 0", backgroundColor: "black" }}
      >
        <Footer />
      </footer>

    </>
  );
}
