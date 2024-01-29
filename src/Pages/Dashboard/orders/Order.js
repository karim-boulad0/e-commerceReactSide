// Your React component
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import "./Order.css";
const EditOrder = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: null,
    status: null,
    note: null,
  });
  const [data, setData] = useState();

  const [orderData, setOrderData] = useState(null);
  const [isGet, setIsGet] = useState(false);
  useEffect(() => {
    Axios.get(`/dashboard/orders/edit/${id}`)
      .then((response) => { setOrder(response.data); setData(response.data) })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (data.status !== 'delivered') {
      Axios.post(`/dashboard/orders/update/${id}`, order)
        .then((response) => nav("/dashboard/orders"))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    Axios.get("/dashboard/orders/getOrderItemsInfo/" + id)
      .then((response) => {
        setOrderData(response.data);
        setIsGet(true);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div class="container">
      <h1>Edit Order</h1>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="status">Status</label>
          <select
            class="form-select"
            id="status"
            name="status"
            value={order.status || ""}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">delivered</option>
          </select>
        </div>

        <div class="form-group">
          <label for="note">Note</label>
          <textarea
            class="form-control"
            id="note"
            name="note"
            value={order.note || ""}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isGet && data.status !== 'delivered' ? false : true}
          class="btn btn-primary"
        >
          Update Order
        </button>
      </form>

      {isGet && (
        <>
          <div class="customer-info">
            <p>
              <strong>Name:</strong> {orderData[0].first_name}{" "}
              {orderData[0].last_name}
            </p>
            <p>
              <strong>Email:</strong> {orderData[0].email}
            </p>
            <p>
              <strong>Phone Number:</strong> {orderData[0].phone_number}
            </p>
            <p>
              <strong>Address:</strong> {orderData[0].address}
            </p>
          </div>

          <div class="order-info">
            <p>
              <strong>Order ID:</strong> {orderData[0].id}
            </p>
            <p>
              <strong>Order Status:</strong> {orderData[0].status}
            </p>
            <p>
              <strong>Order Note:</strong> {orderData[0].note}
            </p>
            <p>
              <strong>Order Total Price:</strong> {orderData[0].total_price}
            </p>
            <p>
              <strong>Order payment_method:</strong>{" "}
              {orderData[0].payment_method}
            </p>
          </div>

          <div class="order-items-container">
            {orderData[0].order_items.map((orderItem) => (
              <div key={orderItem.id} class="order-item-card">
                <img
                  src={orderItem.product.image}
                  alt={orderItem.product.title}
                />
                <p>
                  <strong>Product:</strong> {orderItem.product.title}
                </p>
                <p>
                  <strong>Quantity:</strong> {orderItem.quantity}
                </p>
                <p>
                  <strong>Status:</strong> {orderItem.status}
                </p>
                <p>
                  <strong>Price:</strong> {orderItem.product.price}$
                </p>
                {orderItem.product.discount > 0 && (
                  <p>
                    <strong>discount:</strong> {orderItem.product.discount}$
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EditOrder;
