import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderItems = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [isGetOrderItems, setIsGetOrderItems] = useState(false);
  const [action, setAction] = useState(0);
const nav= useNavigate();
  useEffect(() => {
    Axios.get("/webSite/orderItems/index")
      .then((response) => {
        setOrderItems(response.data);
        setIsGetOrderItems(true);
      })
      .catch((err) => console.log(err));
  }, [action]);
  async function confirmAll() {
    try {
      await Axios.post("/webSite/orders/confirmAll");
      setAction((prev) => prev + 1);
      nav("/NavBar/orders");
    } catch (err) {
      nav("/NavBar/orders");

      console.log(err);
    }
  }
  const showOrdersItems =
    isGetOrderItems &&
    orderItems.map((item) => (
      <Col key={item.id} className="mb-4">
        <Card className="h-100">
          <Card.Img
            src={item.image}
            alt={item.title}
            className="img-fluid"
            style={{ height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              <strong>Price: $</strong>
              {item.price}
            </Card.Text>
            <Card.Text>
              <strong>Quantity:</strong>
              {item.quantity}
            </Card.Text>
            <Card.Text>
              <strong>Status: </strong>
              {item.status}
            </Card.Text>
            <Card.Text>
              <strong>Note:</strong> {item.note}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  return (
    <Container>
      <h1 className="text-center mb-4">Order Items</h1>
      <div className="btn btn-primary" onClick={confirmAll}>
        confirm all order items
      </div>
      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {showOrdersItems}
      </Row>
    </Container>
  );
};

export default OrderItems;
