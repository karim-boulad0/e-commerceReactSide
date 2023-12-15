import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
export default function Test() {
  const [form, setForm] = useState({
    quantity: 1,
    note: "done",
  });

  async function addOrderItem() {
    try {
      const response = await Axios.post(
        "/webSite/orderItems/addOrderItem/1",
        form
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1 className="btn btn-primary" onClick={addOrderItem}>
        test addOrderItem
      </h1>
    </>
  );
}

/**
 * 




public function confirmAll() {
    // Get the authenticated user's ID
    $userId = auth()->user()->id;

    // Create a new order
    $order = Order::create(['user_id' => $userId]);

    // Retrieve the user's order items (assuming you have an "order_items" relationship on the User model)
    $userOrderItems = auth()->user()->orderItems;

    // Move order items to the new order
    foreach ($userOrderItems as $orderItem) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $orderItem->product_id,
            'quantity' => $orderItem->quantity,
            // You can copy any other relevant information from the order item
        ]);

        // Delete the order item after moving to the order
        $orderItem->delete();
    }

    // Redirect or return a response
}

 */
// useEffect(() => {
//   Axios.get(`/dashboard/ordersOfUser/index`)
//     .then((data) => {
//       setUserData(data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [action]);
