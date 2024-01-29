import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Modal,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../Components/Global/Spinner";
import "./css/Orders.css";
export default function WebSiteOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [isGetOrders, setIsGetOrders] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [IsEdit, setIsEdit] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteConfirmation = (orderItemId) => {
    setId(orderItemId);
    setShowDeleteConfirmation(true);
  };
  const handleDeleteClose = () => setShowDeleteConfirmation(false);
  const handleModalShow = (orderItem) => {
    setId(orderItem.id);
    setNote(orderItem.note);
    setQuantity(orderItem.quantity);
    setStatus(orderItem.status);
    setShowModal(true);
  };

  useEffect(() => {
    Axios.get("/webSite/orders/index")
      .then((response) => {
        setOrders(response.data);
        setIsGetOrders(true);
      })
      .catch((err) => console.log(err));
  }, [IsEdit]); // Update the dependency array
  const handleModalClose = () => setShowModal(false);

  const toggleOrder = (orderId) => {
    setOpenOrder((prevOpenOrder) =>
      prevOpenOrder === orderId ? null : orderId
    );
  };

  async function handleEdit() {
    try {
      if (quantity >= 1 && quantity <= 3) {
        await Axios.post(`/webSite/orderItems/editOrderItem`, {
          id: id,
          quantity: quantity,
          note: note,
          status: status,
        });
        setIsEdit((prev) => prev + 1);
        handleModalClose();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await Axios.delete(`/webSite/orderItems/deleteOrderItem/${id}`);
      setIsEdit((prev) => prev + 1);
      handleDeleteClose();
    } catch (err) {
      console.log(err);
    }
  }
  if (!isGetOrders) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  return (
    <Container>
      <h1>Orders</h1>
      {isGetOrders &&
        orders.map((order) => (
          <div key={order.id} className="mb-3">
            <div
              className="alert alert-primary"
              onClick={() => toggleOrder(order.id)}
            >
              <h3>Order #{order.id}</h3>
              <p className="bold-label">Status: {order.status}</p>
              <p className="bold-label">
                payment_method: {order.payment_method}
              </p>
              <p className="bold-label">note: {order.note}</p>
              <p className="bold-label">
                total_price: {formatCurrency(order.total_price)}
              </p>
            </div>
            {openOrder === order.id && (
              <div>
                <h4>Order Items:</h4>
                <Row>
                  {order.order_items.map((orderItem, index) => (
                    <Col
                      key={orderItem.id}
                      lg={3}
                      md={4}
                      sm={6}
                      xs={6}
                      className="mb-2"
                    >
                      <Card
                        className={
                          orderItem.status === "pending"
                            ? "bg-dark text-white"
                            : ""
                        }
                      >
                        <Card.Body>
                          <Image
                            src={orderItem.product.image}
                            alt={orderItem.product.title}
                            fluid
                          />
                          {order.status === "pending" && (
                            <div className="d-flex justify-content-around mt-1">
                              <FontAwesomeIcon
                                cursor="pointer"
                                className="text-primary"
                                icon={faEdit}
                                onClick={() => handleModalShow(orderItem)}
                              />

                              <FontAwesomeIcon
                                cursor="pointer"
                                className="text-danger"
                                icon={faDeleteLeft}
                                onClick={() =>
                                  handleDeleteConfirmation(orderItem.id)
                                }
                              />
                            </div>
                          )}
                          <p className="bold-label">
                            {orderItem.product.title}
                          </p>
                          <p className="bold-label">
                            Status : {orderItem.status}
                          </p>
                          <p className="bold-label">
                            Quantity: {orderItem.quantity}
                          </p>
                          <p className="bold-label">
                            piece price: {orderItem.product.price} $
                          </p>
                          {orderItem.product.discount > 0 && (
                            <p className="bold-label">
                              discount: {orderItem.product.discount} %
                            </p>
                          )}
                          {/* Add other order item details here */}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        ))}

      {/* Modal for editing order item */}
      <Modal key={id} show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <p className="bold-label">ID: {id}</p>
              <label htmlFor="quantity" className="form-label bold-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                max={3}
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note" className="form-label bold-label">
                Note:
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label bold-label">
                Status:
              </label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                {/* Add other status options as needed */}
              </select>
            </div>
            {/* Add other input fields (text, number) here */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete modal */}
      <Modal show={showDeleteConfirmation} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="bold-label">
            Are you sure you want to delete this item?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
