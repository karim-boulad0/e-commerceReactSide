import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import Spinner from "../../../Components/Global/Spinner";
import Rating from "react-rating-stars-component";
import { Card, Col, Row } from "react-bootstrap";

export default function CategoryProducts() {

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const { id } = useParams();

  // get products of category by id using filter 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `/webSite/categoriesWithProductsById/${id}?filter[item]=${searchTerm}`
        );
        setCategoryProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id, searchTerm]); // Include searchTerm as a dependency

  // handle search filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  //show
  const showProducts = (
    <Row>
      {categoryProducts.map((product,index) => (
        <Col className="mb-4" md={4} lg={3} sm={6} key={index}>
          <Card className=" mb-4 shadow">
            <Link to={`/NavBar/product/${product.id}`}>
              <img
                src={product.images[0]?.image || "default-image-url.jpg"}
                alt={product.title}
                className="card-img-top img-fluid"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">{product.title}</Card.Title>
              <Card.Text className="card-text">{product.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <Rating
                  count={5}
                  disabled
                  value={parseInt(product.rating)} // or parseFloat(product.rating)
                  size={20}
                  activeColor="#ffd700"
                />
                <p className="mb-0">Price: ${product.price}</p>
              </div>
            </Card.Body>
            <div className="card-footer">
              <Row className="d-flex">
                {product.images.slice(0, 5).map((img, index) => (
                  <Col key={index} lg={6} md={6} sm={4}>
                    <img
                      key={index}
                      src={img.image}
                      alt={`img ${index}`}
                      className="img-thumbnail mx-2"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        zIndex: 1,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "scale(4.6)";
                        e.target.style.zIndex = 2;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.zIndex = 1;
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
        {showProducts}
      </div>
    </>
  );
}
