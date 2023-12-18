import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { useParams } from "react-router-dom";
import "./Test.css";
export default function Test() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isGet, setIsGet] = useState(false);

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
  {isGet && (
    <>
      {/* <!-- User Info --> */}
      <div class="customer-info">
        <p><strong>Name:</strong> {orderData[0].first_name} {orderData[0].last_name}</p>
        <p><strong>Email:</strong> {orderData[0].email}</p>
        <p><strong>Phone Number:</strong> {orderData[0].phone_number}</p>
        <p><strong>Address:</strong> {orderData[0].address}</p>
      </div>

      {/* <!-- Order Info --> */}
      <div class="order-info">
        <p><strong>Order ID:</strong> {orderData[0].id}</p>
        <p><strong>Order Status:</strong> {orderData[0].status}</p>
        <p><strong>Order Note:</strong> {orderData[0].note}</p>
      </div>

      {/* <!-- Order Items Info --> */}
      <div class="order-items-container">
        {orderData[0].order_items.map((orderItem) => (
          <div key={orderItem.id} class="order-item-card">
            <img src={orderItem.product.image} alt={orderItem.product.title} />
            <p><strong>Product:</strong> {orderItem.product.title}</p>
            <p><strong>Quantity:</strong> {orderItem.quantity}</p>
            <p><strong>Status:</strong> {orderItem.status}</p>
          </div>
        ))}
      </div>
    </>
  )}
</div>
  );
}
