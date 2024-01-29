import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/WebsiteProduct.css";
import Spinner from "../../../Components/Global/Spinner";
export default function WebsiteProduct() {
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState("");
  const [isHasDetails, setIsHasDetails] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const [doneCart, setDoneCart] = useState(0);
  const nav = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  // add Order item
  async function addOrderItem() {
    try {
      // Validate quantity to be between 1 and 3
      if (quantity < 1 || quantity > 3) {
        console.error("Quantity must be between 1 and 3");
        return;
      }
      setDoneCart((prev) => prev + 1);
      if (isAuth) {
        if (isHasDetails) {
          await Axios.post(`/webSite/orderItems/addOrderItem/${id}`, {
            quantity: quantity,
            note: "done",
          }).then((data) => {
            nav("/index/carts");
          });
        } else {
          nav("/index/userDetails");
        }
      } else {
        nav("/login");
      }
    } catch (err) {
      console.error(err);
    }
  }
  // check user details
  useEffect(() => {
    Axios.get("/webSite/checkUserDetails")
      .then((data) => setIsHasDetails(data.data.hasDetails))
      .catch((err) => console.log(err));
  }, []);
  // check auth
  useEffect(() => {
    Axios.get("/isAuthExist")
      .then((data) => setIsAuth(data))
      .catch((err) => console.log(err));
  }, []);
  // rate by client
  useEffect(() => {
    async function updateRating() {
      try {
        if (rating !== "" && rating >= 1) {
          await Axios.post(`webSite/CreateProductReview/${id}`, {
            rate: rating,
          });
        }
        const response = await Axios.get(`webSite/product/${id}`);
        setIsGet(true);
        setProduct(response.data.data);
      } catch (err) {
        if (err.response.status === 401) {
          nav(`/login`);
        }
        console.log(err);
      }
    }
    updateRating();
  }, [rating, id, nav]);
  //  handle change rate
  async function handleRatingChange(newRating) {
    setRating(newRating);
  }
  const showProducts =
    product.images &&
    product.images.map((image, index) => (
      <Col
        md={6}
        lg={6}
        xs={4}
        sm={6}
        key={index}
        className="product-image" // Add the CSS class for the container
      >
        <Card>
          <Card.Img
            className="img-fluid" // Add the CSS class for the image
            variant="top"
            src={image.image}
            alt={product.title}
          />
        </Card>
      </Col>
    ));
  if (!isGet) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Container style={{ marginTop: "80px", marginBottom: "80px" }}>
        <Row>
          <Col md={6}>
            <Card className="custom-card">
              <Card.Img
                variant="top"
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].image
                    : ""
                }
                alt={product.title}
                className="card-image"
              />
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    <Rating
                      count={5}
                      value={rating}
                      onChange={handleRatingChange}
                      size={20}
                      activeColor="#ffd700"
                    />
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="mb-2">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Price:</strong> ${product.price}
                    </Card.Text>
                    <Card.Text
                      className="mb-2"
                      style={{
                        visibility: product.discount > 0 ? "visible" : "hidden",
                      }}
                    >
                      <strong>Discount:</strong> {product.discount}%
                    </Card.Text>
                  </Col>
                  <Col sm={4} className="text-center">
                    {isGet && doneCart === 0 && (
                      <FontAwesomeIcon
                        disabled
                        icon={faCartPlus}
                        onClick={addOrderItem}
                        style={{ cursor: "pointer" }}
                        className="text-primary fs-3"
                      />
                    )}
                  </Col>
                  <Col sm={12} md={4} className="text-center mt-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Math.min(parseInt(e.target.value, 10), 3));
                      }}
                      className="w-50 quantity-input"
                      max={3}
                      min={1}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Row>{showProducts}</Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
