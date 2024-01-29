import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Global/Spinner";
import "./css/OrderItems.css";
const OrderItems = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [isGetOrderItems, setIsGetOrderItems] = useState(false);
  const [action, setAction] = useState(0);
  const nav = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClose = () => setShowDeleteConfirmation(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    Axios.get("/webSite/orderItems/index")
      .then((response) => {
        setOrderItems(response.data);
        setIsGetOrderItems(true);
      })
      .catch((err) => {
        console.log(err);
        setIsGetOrderItems(true);
      });
  }, [action]);
  async function confirmAll() {
    try {
      await Axios.post("/webSite/orders/confirmAll", {
        payment_method: selectedPaymentMethod
          ? selectedPaymentMethod
          : "on_delivery",
      });
      setAction((prev) => prev + 1);
      nav("/index/orders");
    } catch (err) {
      nav("/index/orders");
      console.log(err);
    }
  }
  const showOrdersItems =
    isGetOrderItems &&
    orderItems.map((item) => (
      <Col key={item.id} className="mb-4 " lg={3} md={4} sm={6} xs={12}>
        <Card className="h-100 card-container">
          <Card.Img
            src={item.image}
            alt={item.title}
            className="img-fluid card-img"
          />
          <Card.Body>
            <Card.Title className="card-title">{item.title}</Card.Title>
            <Card.Text className="card-text">
              <strong>Price: $</strong>
              {item.price}
            </Card.Text>
            <Card.Text className="card-text">
              <strong>Quantity:</strong>
              {item.quantity}
            </Card.Text>
            <Card.Text className="card-text">
              <strong>Status: </strong>
              {item.status}
            </Card.Text>
            <Card.Text className="card-text">
              <strong>Note:</strong> {item.note}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  if (!isGetOrderItems) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      <h1 className="text-center mb-4">Carts</h1>
      {/* {isGetOrderItems && orderItems.length > 0 ? (<><div className="btn btn-primary" onClick={confirmAll}> */}
      {isGetOrderItems && orderItems.length > 0 ? (
        <>
          <div
            className="btn btn-primary"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            confirm all order items
          </div>{" "}
          <Row xs={1} sm={2} md={3} lg={3} className="g-4 mt-4">
            {showOrdersItems}
          </Row>
        </>
      ) : (
        <h1 className="alert alert-primary">no order Items found</h1>
      )}
      {/* delete modal */}
      <Modal show={showDeleteConfirmation} onHide={handleDeleteClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Order Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to confirm all order items?</p>
        <Form.Group controlId="paymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={selectedPaymentMethod}
            onChange={(event) => setSelectedPaymentMethod(event.target.value)}
          >
            <option value="on_delivery">On Delivery</option>
            <option value="net">Net</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={confirmAll}>
          Confirm All Order Items
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
};

export default OrderItems;
