import { Axios } from "../../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Modal, Button } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

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
      setDoneCart((prev) => prev + 1);
      isAuth
        ? isHasDetails
          ? await Axios.post(`/webSite/orderItems/addOrderItem/${id}`, {
              quantity: quantity,
              note: "done",
            }).then((data) => {
              nav("/NavBar/orderItems");
            })
          : nav("/NavBar/userDetails")
        : nav("/login");
    } catch (err) {
      // if (err.response.status === 401) {
      //   nav(`/login`);
      // }
      console.log(err);
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
        key={index}
        style={{
          width: "250px",
          margin: "5px",
        }}
      >
        <Card>
          <Card.Img
            variant="top"
            style={{
              width: "250px",
              height: "150px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              //   zIndex: 1,
            }}
            src={image.image}
            alt={product.title}
          />
        </Card>
      </Col>
    ));
  return (
    <>
      <Container style={{ marginTop: "80px", marginBottom: "80px" }}>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].image
                    : ""
                }
                style={{ height: "600px" }}
                alt={product.title}
              />
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    {doneCart && (
                      <Rating
                        count={5}
                        value={rating}
                        onChange={handleRatingChange}
                        size={20}
                        activeColor="#ffd700"
                      />
                    )}
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="mb-2">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Price:</strong> ${product.price}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Discount:</strong> {product.discount}%
                    </Card.Text>
                  </Col>
                  <Col sm={4}>
                    <>
                      {isGet && doneCart === 0 && (
                        <FontAwesomeIcon
                          disabled
                          icon={faCartPlus}
                          onClick={addOrderItem}
                          style={{ cursor: "pointer" }}
                          className="text-primary fs-3"
                        />
                      )}
                    </>
                  </Col>
                  <Col sm={4}>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>{
                        setQuantity(parseInt(e.target.value, 10))
                        console.log(quantity)}
                      }
                      className="w-50"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h3>Images</h3>
            <Row>{showProducts}</Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
